import { getRandomGif } from '../gif';
import { help } from './help';
import { debug } from './debug';
import { birthday } from './birthday';
import { cutie } from './cutie';
import { register } from './register';

export const commands = {
  help,
  debug,
  birthday,
  cutie,
  register,
  boop: async ({ message, args }) => {
    const gif = await getRandomGif({ keywords: ['anime', 'boop', 'nose'] });
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

    message.channel.send(`> *${message.member.user} pokes ${args[0]}!* \n`, {
      files: ['https://tenor.com/8pJJ.gif'],
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
  shiro: ({ message, args }) => {
    message.channel.send(`> Shiro is the cutest hiro <3`);
  },
  vocal: ({ message, args }) => {
    message.channel.send(`> Vocal is a super cutie! <3`);
  },
  test: ({ message, args }) => {
    message.channel.send(`> I'm online and working!`);
  },
  default: ({ message, args }) => {
    message.channel.send('> Please provide a valid command');
  },
};
