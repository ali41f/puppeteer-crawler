const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://comfortworkscovers.myshopify.com/');

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', 'aoltay');

  // Click on the submit button and wait for the page to load
  await page.click('button.button-1');
  await page.waitForNavigation();

  // Retrieve all the links on the page
  const links = await page.$$eval('a', links => links.map(link => link.href));

  console.log(links);

  // Close the browser instance
  await browser.close();
})();
