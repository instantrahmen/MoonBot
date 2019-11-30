import { getRandomGifFromArray } from '../gif';
import { client, sanityConfig } from '../../sanity';
import handlebars from 'handlebars';

let cachedCommands = [];
export const clearCommandCache = () => (cachedCommands = []);

const getCommandInfo = command => {
  const query = `*[_type == "commands" && command == $command] {
    messageText,
    "gifUrls": gifs[].asset->url
  }`;
  const params = { command };
  return client.fetch(query, params);
};

const getAllCommands = () => {
  const query = `*[_type == "commands"] {
    command
  }`;
  const params = {};
  return client.fetch(query, params);
};

export const allSanityCommands = async () => {
  let commands = {};
  if (cachedCommands.length === 0) {
    console.log({ creatingCache: true });
    cachedCommands = await getAllCommands();
  }
  cachedCommands.forEach(
    ({ command }) => (commands[command] = sanityCommand(command))
  );
  return commands;
};

export const sanityCommand = command => async ({ message, args }) => {
  let { gifUrls = [], messageText = '' } = (await getCommandInfo(command))[0];
  const gif = noGifs(gifUrls)
    ? {}
    : { files: [getRandomGifFromArray({ images: gifUrls })] };
  // console.log(gifUrls, gif);

  const sender = message.member.user;
  const target = args.length >= 1 ? args[0] : 'nobody';

  return message.channel.send(
    parseMessageText({ sender, target }, messageText),
    gif
  );
};

const noGifs = gifUrls =>
  gifUrls === 'undefined' || !gifUrls || gifUrls.length === 0;

const parseMessageText = (context = {}, source: string) => {
  const template = handlebars.compile(`${source}`);

  const result = template(context);
  // console.log({ source, context, result });
  return result;
};
