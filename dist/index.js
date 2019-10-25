"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Discord = __importStar(require("discord.js"));
const commands_1 = require("./commands");
const client = new Discord.Client();
const prefix = 'moon!';
client.once('ready', () => {
    console.log('Ready!');
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    // console.log({ command });
    if (command.length === 0 || typeof commands_1.commands[command] === 'undefined') {
        commands_1.commands.default({ message, args });
    }
    else {
        try {
            commands_1.commands[command]({ message, args });
        }
        catch (e) {
            message.channel.send('Command failed');
            commands_1.commands.debug({ message, args, error: e });
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map