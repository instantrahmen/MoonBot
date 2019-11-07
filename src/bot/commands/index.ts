import parseColor from 'parse-color';

import { getRandomGif, getRandomGifFromArray } from '../gif';
import { help } from './help';
import { debug } from './debug';
import { birthday } from './birthday';
import { cutie } from './cutie';
import { register, updateUserInfo } from './register';
import { userSpecificCommands } from './user-specifc-commands';
import { profile } from './profile';

export const commands = {
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
  boop: async ({ message, args }) => {
    // const gif = await getRandomGif({ keywords: ['anime', 'boop', 'nose'] });
    const gifs = [
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boop_bitch.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Neko_Baby_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Hoody_Tsuki_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Punk_Tsuki_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/TsuCowmoon_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/LunaBoop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Adult_Tsuki_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Witch_Tsuki_Boop.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Neko_Baby_Boop_Barrage.gif',
      'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Teen_Tsuki_Boop.gif',
    ];
    // const gif =
    //   'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boop_bitch.gif';
    const gif = getRandomGifFromArray({ images: gifs });
    if (args.length >= 1) {
      message.channel.send(`> *${message.member.user} boops ${args[0]}!*`, {
        files: [gif],
      });
    } else {
      message.channel.send(`> *${message.member.user} boops... nobody?!*`, {
        files: [gif],
      });
    }
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
    // const gif = await getRandomGif({ keywords: ['anime', 'boop', 'poke'] });

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
};
