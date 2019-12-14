import { getRandomGifFromArray } from "../gif";
import { client, sanityConfig } from "../../sanity";
import handlebars from "handlebars";
import ejs from "ejs";
import { inspect } from "util";

let cachedCommands = [];
export const clearCommandCache = () => (cachedCommands = []);

const getCommandInfo = command => {
  const query = `*[_type == "commands" && command == $command] {
    messageText,
    templateEngine,
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
  let { gifUrls = [], messageText = "", templateEngine } = (
    await getCommandInfo(command)
  )[0];
  const gif = noGifs(gifUrls)
    ? {}
    : { files: [getRandomGifFromArray({ images: gifUrls })] };
  // console.log(gifUrls, gif);

  const sender = message.member.user;
  const target = args.length >= 1 ? args[0] : "nobody";

  return message.channel.send(
    parseMessageText(
      {
        sender,
        target,
        args,
        message,
        inspect,
        senderUsername: `${message.author.username}#${message.author.discriminator}`
      },
      messageText,
      templateEngine
    ),
    gif
  );
};

const noGifs = gifUrls =>
  gifUrls === "undefined" || !gifUrls || gifUrls.length === 0;

const parseMessageText = (
  context = {},
  source: string,
  templateEngine = "handlebars"
) => {
  console.log({ ctx: inspect(context) });
  if (templateEngine === "ejs") {
    return ejs.render(source, context, {
      escape: input => input // In this case we don't want to ever escape html because we aren't rendering to html
    });
  } else {
    const template = handlebars.compile(source);
    const result = template(context);
    return result;
  }
};
