import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const base_url_tenor = `https://api.tenor.com/v1/random`;

const TENOR_API_KEY = process.env.TENOR_API_KEY;

export const getRandomGif = async ({ keywords = [] }) => {
  const queryParams = `?q=${keywords.join('+')}&key=${TENOR_API_KEY}`;

  try {
    const res = await axios.get(base_url_tenor + queryParams);
    return res.data.results[0].media[0].gif.url;
  } catch (e) {
    console.log({ url: base_url_tenor + queryParams });
    console.error(e);
  }
  return null;
};

export const getRandomGifs = async ({ keywords = [] }) => {
  const queryParams = `?q=${keywords.join(
    '+'
  )}&limit=8&key=${TENOR_API_KEY}&preventCacheId=${Date.now()}`;

  try {
    const res = await axios.get(base_url_tenor + queryParams);
    const urls = res.data.results.map(({ url }) => url);
    return urls;
  } catch (e) {
    console.log({ url: base_url_tenor + queryParams });
    console.error(e);
  }

  return [''];
};

export const getRandomGifFromArray = ({ images }: { images: string[] }) =>
  images[randomNumber({ max: images.length })];

const randomNumber = ({ max }) => Math.floor(Math.random() * max);

const download = async url => {
  const imagePath = `static/${path.basename(url)}`;
  const writer = fs.createWriteStream(imagePath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(imagePath));
    writer.on('error', reject);
  });
};

export const downloadImages = images => {
  const downloadedImages = images.map(async (uri, i) => await download(uri));
  return downloadedImages;
};
