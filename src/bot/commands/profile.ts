import { User } from '../../db';
import puppeteer from 'puppeteer';

const clientUrl = process.env.CLIENT_URL;

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

export const calculateLevel = ({ exp }) => {
  // I'll start with something simple and just do linear level progression for now.
  // I want to update this later, but it can't be exponential due to the nature of discord
  const level = Math.floor(exp / 1000);
};
