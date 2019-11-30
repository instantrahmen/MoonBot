import parseColor from 'parse-color';

import { getRandomGif, getRandomGifFromArray } from '../gif';
import { help } from './help';
import { debug } from './debug';
import { birthday } from './birthday';
import { cutie } from './cutie';
import { boop } from './boop';
import { allSanityCommands, clearCommandCache } from './sanityCommands';
import { register, updateUserInfo } from './register';
import { userSpecificCommands } from './user-specifc-commands';
import { profile } from './profile';

export const commands = async () => ({
  help,
  debug,
  birthday,
  cutie,
  register,
  profile,
  setbio: async ({ message, args }) => {
    try {
      const bio = args.join(' ');
      await updateUserInfo({ message, args, bio });
      message.channel.send(`Bio updated to: \n${bio}`);
    } catch (e) {
      message.channel.send(`Error: could not update bio`);
      console.error(e);
    }
  },
  setcolor: async ({ message, args }) => {
    try {
      const color = parseColor(args[0]);
      console.log({ color });
      await updateUserInfo({ message, args, color: color.hex });
      message.channel.send(`Color updated to: \n${color.hex}`);
    } catch (e) {
      message.channel.send(`Error: could not update color`);
      console.error(e);
    }
  },

  snapneck: ({ message, args }) => {
    const gifs = [
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/necksnap/ShiroNeckSnap.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/necksnap/ShiroNeckSnap2.gif',
    ];
    let gif = getRandomGifFromArray({ images: gifs });

    message.channel.send(``, {
      files: [gif],
    });
  },

  clearCache: async ({ message, args }) => {
    clearCommandCache();
    message.channel.send(`The cache has been cleared`, {});
  },
  poke: async ({ message, args }) => {
    const gif = await getRandomGif({ keywords: ['anime', 'boop', 'poke'] });

    if (args.length >= 1) {
      message.channel.send(`> *${message.member.user} pokes ${args[0]}!* \n`, {
        files: [gif],
      });
    } else {
      message.channel.send(`> *${message.member.user} pokes... nobody?!* \n`, {
        files: [gif],
      });
    }
  },
  wheeze: async ({ message, args }) => {
    message.channel.send(`> *${message.member.user} wheezes* \n`, {
      files: [
        'https://media.tenor.com/images/7f4f32991a677d02172305fe793fdb73/tenor.gif',
      ],
    });
  },
  hug: async ({ message, args }) => {
    const gif = await getRandomGif({ keywords: ['hug', 'anime'] });

    if (args.length >= 1) {
      message.channel.send(`> *${message.member.user} hugs ${args[0]}!* \n`, {
        files: [gif],
      });
    } else {
      message.channel.send(`> *${message.member.user} hugs... nobody?!* \n`, {
        files: [gif],
      });
    }
  },
  apple: ({ message, args }) => {
    if (args.length >= 1) {
      message.channel.send(
        `> *${message.member.user} gives ${args[0]} an apple! 🍎*`
      );
    } else {
      message.channel.send(
        `> *${message.member.user} gives an apple to... nobody?! 🍎*`
      );
    }
  },
  test: ({ message, args }) => {
    message.channel.send(`> I'm online and working!`);
  },
  default: ({ message, args }) => {
    message.channel.send('> Please provide a valid command');
  },
  ...userSpecificCommands,
  ...(await allSanityCommands()),
  // Custom implementations of Sanity commands can go below here
});
