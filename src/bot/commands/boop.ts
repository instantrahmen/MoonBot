import { getRandomGifFromArray } from '../gif';
import { client, sanityConfig } from '../../sanity';
import handlebars from 'handlebars';

const getCommandInfo = command => {
  const query = `*[_type == "commands" && command == $command] {
    messageText,
    "gifUrls": gifs[].asset->url
  }`;
  const params = { command };
  return client.fetch(query, params);
};

export const boop = async ({ message, args }) => {
  const { gifUrls, messageText = '' } = (await getCommandInfo('boop'))[0];
  const gif = getRandomGifFromArray({ images: gifUrls });

  const sender = message.member.user;
  const target = args.length >= 1 ? args[0] : '... nobody?';
  return message.channel.send(
    parseMessageText({ sender, target }, messageText),
    {
      files: [gif],
    }
  );
};

const parseMessageText = (context = {}, source: string) => {
  const unescapedSource = source.replace('{{', '{{{').replace('}}', '}}}');
  const template = handlebars.compile(`${unescapedSource}`);

  const result = template(context);
  console.log({ source, context, result });
  return result;
};
