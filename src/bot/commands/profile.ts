import { User } from '../../db';
import puppeteer from 'puppeteer';

const clientUrl = 'http://localhost:3000';

export const profile = async ({ message, args }) => {
  // const user = await User.findOne({
  //   discordId: message.author.id,
  // });
  try {
    const filename = `screenshot-${Date.now()}.png`;
    await getPageScreenshot(
      `${clientUrl}/account/${message.author.id}`,
      `${__dirname}/../../../static/profile-images/${filename}`
    );

    message.channel.send(`Profile retrieved`, {
      files: [`https://localhost:3069/profile-images/${filename}`],
    });

    // return filename;
  } catch (e) {
    console.error(e);
    message.channel.send(`Unable to obtain profile info`);
  }
};

const getPageScreenshot = async (url, path) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path });
  await browser.close();
};
