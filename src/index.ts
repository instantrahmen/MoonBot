require('dotenv').config();
import * as Discord from 'discord.js';
import { commands } from './commands';

const client = new Discord.Client();

const prefix = 'moon!';

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // console.log({ command });
  if (command.length === 0 || typeof commands[command] === 'undefined') {
    commands.default({ message, args });
  } else {
    try {
      commands[command]({ message, args });
    } catch (e) {
      message.channel.send('Command failed');
      commands.debug({ message, args, error: e });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
