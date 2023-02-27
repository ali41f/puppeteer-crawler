const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');

const MAX_ROWS = 10;
const CSV_PATH = 'productURLs.csv';

const objects = [];
const urls = [];
const results = [];

(async () => {

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on('data', (data) => {
    objects.push(data);
  })
  .on('end', async () => {

    for (let i = 200; i < 500; i++) {
        const object = objects[i];
        urls.push(Object.values(object)[0]);
    }

    console.log(urls)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Loop through each URL and extract the product name inside the h3 tag
    for (const url of urls) {
    console.log(url)
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    const content = await page.$eval('h3.cw-product-h1-header', el => el.textContent.trim());
    results.push({ url, content });
    }

    // Save the results to a CSV file
    const csvData = results.map(row => [row.url, row.content].join(',')).join('\n');
    // fs.writeFile for first time. 
    fs.appendFile('output.csv', `\n${csvData}`, err => {
    if (err) throw err;
    console.log('Results saved to output.csv');
    });

    await browser.close();

  });

})();

/*   GET ALL THE product URLs from collection pages
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://comfort-works.com/sitemap-product.xml');

  const urls = await page.$$eval('loc', links => {
    return links.map(link => link.textContent);
  });

  console.log(urls);

  const allUrls = [];

  for (const url of urls) {
    const innerPage = await browser.newPage();
    await innerPage.goto(url, {waitUntil: 'load', timeout: 0});
    const innerUrls = await innerPage.$$eval('loc', links => {
      return links.map(link => link.textContent);
    });
    allUrls.push(...innerUrls);
    await innerPage.close();
  }

  console.log(allUrls);

  const csvData = allUrls.join('\n');

  fs.writeFile('productURLs.csv', csvData, err => {
    if (err) throw err;
    console.log('URLs saved to urls.csv');
  });

  await browser.close();
})();
*/

/*   GET ALL THE CONTENT INSIDE <loc></loc>
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://comfort-works.com/sitemap-product.xml');

  const urls = await page.$$eval('loc', links => {
    return links.map(link => link.textContent);
  });

  console.log(urls);

  const csvData = urls.join('\n');

  fs.writeFile('collectionURLs.csv', csvData, err => {
    if (err) throw err;
    console.log('URLs saved to urls.csv');
  });

  await browser.close();
})();

  
  

/*   GET ALL THE LINK URL FROM WEB PAGE
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://comfort-works.com');

  const urls = await page.$$eval('a', links => {
    return links.map(link => link.href);
  });

  console.log(urls);

  const csvData = urls.join('\n');

  fs.writeFile('urls.csv', csvData, err => {
    if (err) throw err;
    console.log('URLs saved to urls.csv');
  });

  await browser.close();
})();
*/