import { Url } from '@prisma/client';
import * as fs from 'node:fs';
import { Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/firefox';
import { combineImagesVertically } from '../../tools/image/mergeImg';

export default async (url: string, scenario: 'singleShot' | 'merge') => {
  if (scenario == 'singleShot') {
    const uri = url.split('/').slice(2, 3).join('-');
    const baseFilename = `dist/public/images/images_url/${uri}.png`;
    const options = new chrome.Options();
    const driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser('firefox')
      .build();

    // Navigate to the page and do your work here
    await driver.navigate().to(url);

    // Now capture a screenshot

    await driver.executeScript(`window.scrollTo(0, 0);`);

    const encodedString = await driver.takeScreenshot();

    await fs.promises.writeFile(baseFilename, encodedString, 'base64').then();
    return { msg: 'snapshot taken ', baseFilename: baseFilename };
  } else if (scenario == 'merge') {
    const MAX_SCREENSHOTS = 15;
    const uri = url.split('/').slice(2, 3).join('-');
    const baseFilename = `dist/public/images/images_url_temp/${uri}.png`;
    const options = new chrome.Options();
    const driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser('chrome')
      .build();

    // Navigate to the page and do your work here
    await driver.navigate().to(url);

    // Now capture a screenshot
    const data = await driver.executeScript(
      'return {windowHeight: window.innerHeight, clientHeight: document.body.clientHeight};',
    );
    let height = 0;
    let index = 0;
    const screenshots = [];
    while (index < MAX_SCREENSHOTS && height < data.clientHeight) {
      index = index + 1;
      if (height + data.windowHeight > data.clientHeight) {
        height = data.clientHeight - data.windowHeight;
      }

      await driver.executeScript(`window.scrollTo(0, ${height});`);
      const encodedString = await driver.takeScreenshot();
      const fn = `"${baseFilename}"-${index}.png`;
      await fs.promises.writeFile(fn, encodedString, 'base64');
      screenshots.push(fn);
      height = height + data.windowHeight;
    }
    //combineImagesVertically(screenshots, height);
  }
};
