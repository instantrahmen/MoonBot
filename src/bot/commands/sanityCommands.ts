import { getRandomGifFromArray } from "../gif";
import { client, sanityConfig } from "../../sanity";
import handlebars from "handlebars";
import ejs from "ejs";
import { inspect } from "util";

let cachedCommands = [];
export const clearCommandCache = () => (cachedCommands = []);

const fetchMember = (message) => message.guild.fetchMember(message.author)
const getSender = async (message) => (await fetchMember(message)).user

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
  let gif = noGifs(gifUrls)
    ? {}
    : { files: [getRandomGifFromArray({ images: gifUrls })] };


  try {
    // const sender = !!message.member
    //   ? message.member.user
    //   : await fetchMember(message).user
    const sender = await getSender(message)
    if (!sender) {
      console.log({sender, member: await fetchMember(message), author: message.author, message})

      return message.channel.send(
        `Oops, that user hasn't been cached I guess.`
      );
    }

    const target = args.length >= 1 ? args[0] : "nobody";

    const ignoreGif = () => {
      gif = {};
    };

    const parsedText = parseMessageText(
      {
        sender,
        target,
        args,
        message,
        inspect,
        senderUsername: `${message.author.username}#${message.author.discriminator}`,
        ignoreGif
      },
      messageText,
      templateEngine
    );

    // console.log({ MEMBER_FROM_GUILD: message.guild.members.get(message.author.id), author: message.author });

    return message.channel.send(parsedText, gif);
  } catch (e) {
    console.log({member: fetchMember(message), author: message.author})
    const errorObject = {error: e, message}
    console.error(errorObject)
  }
};


// const stringify = (obj) => JSON.stringify( obj, (key, value) => {
//   if(key == 'parent') { return '{{parent}}';}
//   else {return value;}
// }, 2)

const noGifs = gifUrls =>
  gifUrls === "undefined" || !gifUrls || gifUrls.length === 0;

const parseMessageText = (
  context = {},
  source: string,
  templateEngine = "handlebars"
) => {
  console.log({ ctx: inspect(context) });
  let result;
  if (templateEngine === "ejs") {
    result = ejs.render(source, context, {
      escape: input => input // In this case we don't want to ever escape html because we aren't rendering to html
    });
  } else {
    const template = handlebars.compile(source);
    result = template(context);
  }
  return result;
};
