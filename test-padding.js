import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3005/login');
  
  await page.waitForTimeout(2000); // allow vue to mount
  
  // Find the email input (it should have a left icon based on the Drawer code, but wait, login might be different)
  // Let's just check the wrapper classes of any input on the login page to see if padding is applied
  const inputs = await page.$$('.input-wrapper');
  console.log(`Found ${inputs.length} AppFormFields on the page`);

  for (const wrapper of inputs) {
    const className = await wrapper.getAttribute('class');
    const hasLeftIcon = className.includes('has-left-icon');
    
    if (hasLeftIcon) {
       const input = await wrapper.$('input');
       if (input) {
          const paddingLeft = await input.evaluate((el) => window.getComputedStyle(el).paddingLeft);
          console.log(`Input with left icon has padding-left: ${paddingLeft}`);
       }
    }
  }

  await browser.close();
})();
