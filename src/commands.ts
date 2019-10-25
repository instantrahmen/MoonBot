import { User } from './db';
import { Message } from 'discord.js';
import * as chrono from 'chrono-node';
import { format, parse } from 'date-fns';

import { getRandomGif, getRandomGifs, downloadImages } from './gif';
import { checkForBirthdays } from './birthday-check';

export const help = {
  help: { desc: `Show this information again`, usage: `moon!help` },
  boop: { desc: `Boop somebody`, usage: `moon!boop <user>` },
  poke: { desc: `Poke somebody`, usage: `moon!poke <user>` },
  apple: { desc: `Give somebody an apple!`, usage: `moon!apple <user>` },
  hug: { desc: `Give somebody a hug!`, usage: `moon!hug <user>` },
  birthday: {
    desc: `Remember birthdays`,
    usage: `moon!birthday set <date> ${'`'} or ${'`'}moon!birthday check`,
  },
  cutie: {
    desc: `Decide if someone is a cutie (hint: you are)`,
    usage: `moon!cutie <user>`,
  },
  register: {
    desc: `Register for an account (used for keeping track of user stats and birthdays)`,
    usage: `moon!register`,
  },
};

export const commands = {
  help: ({ message, args }) => {
    const commandHelpInfo = [
      '[**Note:** This list will grow as I continue to work on the bot]',

      '**MoonBot Commands:**',
      ...Object.keys(help).map(
        commandName =>
          help[commandName] &&
          `**moon!${commandName}:** \n    ${
            help[commandName].desc
          } \n    **usage:** ${'`' + help[commandName].usage + '`'}`
      ),
    ];
    message.channel.send(commandHelpInfo.filter(cmd => !!cmd).join('  \n'));
  },
  debug: ({ message, args, error = null }) => {
    if (error) {
      message.channel.send(`
      **Error**
      ${'```'}
        ${error.message}
      ${'```'}
      `);
    }
    message.channel.send('💚 Check logs for debug info 💚');
    console.log({ message });
  },
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
        `*${message.member.user} gives ${args[0]} an apple! 🍎*`
      );
    } else {
      message.channel.send(
        `*${message.member.user} gives an apple to... nobody?! 🍎*`
      );
    }
  },
  birthday: async ({ message, args }: { message: Message; args: string[] }) => {
    const [subcommand, ...bdayArray] = args;
    const bday = bdayArray.join(' ');
    if (subcommand === 'set') {
      try {
        const parsedBday = chrono.parseDate(bday);

        if (parsedBday === null) {
          return message.channel.send(
            'Improperly formatted birthday. Could not set.'
          );
        }
        const user = await User.findOneAndUpdate(
          { discordId: message.author.id },
          { birthday: chrono.parseDate(bday) }
        );

        message.channel.send(
          `Birthday set to ${format(parsedBday, 'MMMM do')}`
        );
      } catch (e) {
        message.channel.send(
          'You need to register using `moon!register` before setting a birthday! 💚'
        );
        console.error(e);
      }
    }

    if (subcommand === 'check') {
      const bdayUsers = await checkForBirthdays();
      // console.log({ bdayUsers, msg: message.content });
      const bdayUserStrings = bdayUsers.map(user => `<@${user['discordId']}>`);
      if (bdayUserStrings.length === 0) {
        message.channel.send(`No birthdays today!`);
      } else if (bdayUserStrings.length === 1) {
        message.channel.send(`Happy birthday to ${bdayUserStrings[0]}`);
      } else {
        message.channel.send(`Happy birthday to:
${bdayUsers.slice(0, -1).join(',') + ', and ' + bdayUsers.slice(-1)}
        `);
      }
      // message.channel.send(`Feature not yet ready`);
    }
  },
  cutie: ({ message, args }) => {
    if (args.length > 0) {
      const cutieRating = Math.floor(Math.random() * 7);

      switch (cutieRating) {
        case 1:
          message.channel.send(`${args[0]} is a huge cutie!`);
          break;
        case 2:
          message.channel.send(`${args[0]} is a super cutie!`);
          break;
        case 3:
          message.channel.send(`${args[0]} is a mega cutie!`);
          break;
        case 4:
          message.channel.send(`${args[0]} is a massive cutie!`);
          break;
        case 5:
          message.channel.send(`${args[0]} is a super huge cutie!`);
          break;
        case 6:
          message.channel.send(`${args[0]} is a the biggest cutie!`);
          break;
        default:
          message.channel.send(`${args[0]} is a cutie!`);
      }
    } else {
      message.channel.send('Please provide a username');
    }
  },
  shiro: ({ message, args }) => {
    message.channel.send(`Shiro is the cutest hiro <3`);
  },
  test: ({ message, args }) => {
    message.channel.send(`I'm working and online!`);
  },
  default: ({ message, args }) => {
    message.channel.send('Please provide a valid command');
  },
  register: async ({ message, args }) => {
    try {
      if (message.author.bot) {
        return message.channel.send(`Sorry, robots can't have an account! 💚`);
      }

      await User.create({
        name: message.author.username,
        discordId: message.author.id,
        discriminator: message.author.discriminator,
        avatar: message.author.avatar,
        bot: message.author.bot,
      });

      return message.channel.send(
        `Account for ${message.author.username} created successfully`
      );
    } catch (e) {
      if (e.code === 11000) {
        return message.channel.send(
          'It looks like you already have an account. No need to create a second one :) 💚'
        );
      }
      message.channel.send(
        'An unknown error occurred. Please contact Rahmen for support. 💚'
      );
      console.log(e);
    }
  },
};
