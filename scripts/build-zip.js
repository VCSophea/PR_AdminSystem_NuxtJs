import AdmZip from "adm-zip";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const { name, version } = packageJson;
const zipName = `${name}##V${version}.zip`;
const releaseDir = path.resolve(process.cwd(), "release");
const outputPublicDir = path.resolve(process.cwd(), ".output/public");

async function buildZip() {
  console.log(`🚀 Starting ZIP build for ${name} v${version}...`);

  // 1. Clean release directory if needed (keep existing files from other builds)
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir, { recursive: true });
  }

  // 2. Run static generation
  console.log(`📦 Generating static files...`);
  try {
    execSync("npx nuxi generate", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Generation failed:", error.message);
    process.exit(1);
  }

  // 3. Create ZIP file using adm-zip
  console.log(`🤐 Creating ZIP: ${zipName}...`);
  const zip = new AdmZip();

  // Add the contents of .output/public to the root of the ZIP
  if (fs.existsSync(outputPublicDir)) {
    zip.addLocalFolder(outputPublicDir);
  } else {
    console.error(`❌ Error: Static output directory not found at ${outputPublicDir}`);
    process.exit(1);
  }

  // 4. Write the ZIP file
  const zipPath = path.join(releaseDir, zipName);
  zip.writeZip(zipPath);

  const stats = fs.statSync(zipPath);
  console.log(`✅ ZIP created successfully: ${zipPath} (${stats.size} bytes)`);
}

buildZip().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
