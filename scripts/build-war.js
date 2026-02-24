import AdmZip from "adm-zip";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const pomXmlPath = path.resolve(process.cwd(), "pom.xml");

const { name, version } = packageJson;
const warName = `${name}##V${version}.war`;
const releaseDir = path.resolve(process.cwd(), "release");
const outputPublicDir = path.resolve(process.cwd(), ".output/public");
const webXmlPath = path.resolve(process.cwd(), "web.xml");

function syncPomXml() {
  if (!fs.existsSync(pomXmlPath)) {
    console.warn(`⚠️ Warning: pom.xml not found at ${pomXmlPath}. Skipping synchronization.`);
    return;
  }

  console.log(`🔄 Synchronizing pom.xml with package.json (name: ${name}, version: ${version})...`);
  let pomContent = fs.readFileSync(pomXmlPath, "utf8");

  // Regex to match and replace groupId, artifactId, and version in the root project tag
  // Using more specific regex to avoid matching dependencies if they existed
  pomContent = pomContent.replace(/(<groupId>)[^<]+(<\/groupId>)/, `$1com.udaya-technology.${name}$2`);
  pomContent = pomContent.replace(/(<artifactId>)[^<]+(<\/artifactId>)/, `$1${name}$2`);
  pomContent = pomContent.replace(/(<version>)[^<]+(<\/version>)/, `$1${version}$2`);

  fs.writeFileSync(pomXmlPath, pomContent, "utf8");
}

async function buildWar() {
  console.log(`🚀 Starting WAR build for ${name} v${version}...`);

  // 1. Sync pom.xml
  syncPomXml();

  // 2. Clean release directory
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir, { recursive: true });
  }

  // 3. Run static generation
  console.log(`📦 Generating static files...`);
  try {
    execSync("npx nuxi generate", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Generation failed:", error.message);
    process.exit(1);
  }

  // 4. Create WAR file using adm-zip
  console.log(`🤐 Creating WAR: ${warName}...`);
  const zip = new AdmZip();

  // Add the contents of .output/public to the root of the WAR
  if (fs.existsSync(outputPublicDir)) {
    zip.addLocalFolder(outputPublicDir);
  } else {
    console.error(`❌ Error: Static output directory not found at ${outputPublicDir}`);
    process.exit(1);
  }

  // 5. Ensure WEB-INF/web.xml is included
  if (fs.existsSync(webXmlPath)) {
    console.log(`📄 Adding web.xml to WEB-INF/web.xml...`);
    const webXmlContent = fs.readFileSync(webXmlPath);
    zip.addFile("WEB-INF/web.xml", webXmlContent);
  } else {
    console.warn(`⚠️ Warning: web.xml not found at ${webXmlPath}. Tomcat SPA routing may not work.`);
  }

  // 6. Write the WAR file
  const warPath = path.join(releaseDir, warName);
  zip.writeZip(warPath);

  const stats = fs.statSync(warPath);
  console.log(`✅ WAR created successfully: ${warPath} (${stats.size} bytes)`);
}

buildWar().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
