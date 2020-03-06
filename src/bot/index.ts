require("dotenv").config();
import * as Discord from "discord.js";

import { commands as initCommands } from "./commands";
const client = new Discord.Client();

const prefix = process.env.NODE_ENV === "production" ? "moon!" : "__moon!";

client.once("ready", () => {
  console.log("Moonbot is ready!");
});

client.on("message", async message => {
  // console.log({ message });

  const lowercaseMessage = message.content.toLowerCase();
  if (!lowercaseMessage.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const commands = await initCommands();
  console.log({ commands });
  if (command.length === 0 || typeof commands[command] === "undefined") {
    commands.default({ message, args });
  } else {
    try {
      commands[command]({ message, args });
    } catch (e) {
      message.channel.send("Command failed");
      commands.debug({ message, args, error: e });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
