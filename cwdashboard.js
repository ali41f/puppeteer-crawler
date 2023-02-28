const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://comfort-works.com/dashboard/login/');
  await page.type('#id_username', 'ali.rehman@comfort-works.com');
  await page.type('#id_password', 'pass');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto('https://comfort-works.com/dashboard/#/products');

  await page.waitForSelector('td[data-label="Name"]');

  const productNames = await page.$$eval('td[data-label="Name"]', tds => tds.map(td => td.textContent.trim()));

  console.log(productNames);

  // Close the browser
  await browser.close();
})();
