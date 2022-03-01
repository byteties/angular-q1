const puppeteer = require("puppeteer");

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://codequiz.azurewebsites.net/");
  await page.click("input");
  await page.waitForSelector("tbody");
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("table tbody tr td"));
    return tds.map((td) => td.innerText);
  });
  const text = process.argv[2];
  const index = data.indexOf(text);
  if (index !== -1) {
    console.log(data[index + 1]);
  } else {
    console.log("Not Found");
  }
  await page.close();
  await browser.close();
};

run();
