"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const chrono = __importStar(require("chrono-node"));
const date_fns_1 = require("date-fns");
const gif_1 = require("./gif");
const birthday_check_1 = require("./birthday-check");
exports.help = {
    help: { desc: `Show this information again`, usage: `moon!help` },
    boop: { desc: `Boop somebody`, usage: `moon!boop <user>` },
    poke: { desc: `Poke somebody`, usage: `moon!poke <user>` },
    apple: { desc: `Give somebody an apple!`, usage: `moon!apple <user>` },
    birthday: {
        desc: `Remember member birthday's`,
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
exports.commands = {
    help: ({ message, args, helpInfo = false }) => {
        if (helpInfo)
            return 'Show this information again';
        const commandHelpInfo = [
            '[**Note:** This list will grow as I continue to work on the bot]',
            '**MoonBot Commands:**',
            ...Object.keys(exports.help).map(commandName => exports.help[commandName] &&
                `**moon!${commandName}:** \n    ${exports.help[commandName].desc} \n    **usage:** ${'`' + exports.help[commandName].usage + '`'}`),
        ];
        message.channel.send(commandHelpInfo.filter(cmd => !!cmd).join('  \n'));
    },
    debug: ({ message, args, error = null, helpInfo = false }) => {
        if (helpInfo)
            return '[dev mode only] Output debug logs to the server console';
        if (error) {
            message.channel.send(`
      **Error**
      ${'```'}
        ${error.message}
      ${'```'}
      `);
        }
        message.channel.send('Check logs for debug info 💙');
        console.log({ message });
    },
    boop: ({ message, args, helpInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const gif = yield gif_1.getRandomGif({ keywords: ['anime', 'boop', 'nose'] });
        if (helpInfo)
            return 'Boop somebody!';
        if (args.length >= 1) {
            message.channel.send(`*${message.member.user} booped ${args[0]}!*`, {
                files: [gif],
            });
        }
        else {
            message.channel.send(`*${message.member.user} booped... nobody?!*`, {
                files: [gif],
            });
        }
    }),
    poke: ({ message, args, helpInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const gif = yield gif_1.getRandomGif({ keywords: ['anime', 'boop', 'poke'] });
        if (args.length >= 1) {
            message.channel.send(`> *${message.member.user} poked ${args[0]}!* \n`, {
                files: [gif],
            });
        }
        else {
            message.channel.send(`> *${message.member.user} poked... nobody?!* \n`, {
                files: [gif],
            });
        }
    }),
    hug: ({ message, args, helpInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const gif = yield gif_1.getRandomGif({ keywords: ['anime', 'boop', 'poke'] });
        if (args.length >= 1) {
            message.channel.send(`> *${message.member.user} hugged ${args[0]}!* \n`, {
                files: [gif],
            });
        }
        else {
            message.channel.send(`> *${message.member.user} hugged... nobody?!* \n`, {
                files: [gif],
            });
        }
    }),
    apple: ({ message, args, helpInfo }) => {
        if (helpInfo)
            return 'Give somebody an apple!';
        if (args.length >= 1) {
            message.channel.send(`*${message.member.user} gave ${args[0]} an apple! 🍎*`);
        }
        else {
            message.channel.send(`*${message.member.user} gave an apple to... nobody?! 🍎*`);
        }
    },
    birthday: ({ message, args, helpInfo = false, }) => __awaiter(void 0, void 0, void 0, function* () {
        if (helpInfo)
            return 'Set your birthday to get an automated happy birthday message';
        const [subcommand, ...bdayArray] = args;
        const bday = bdayArray.join(' ');
        if (subcommand === 'set') {
            try {
                const parsedBday = chrono.parseDate(bday);
                if (parsedBday === null) {
                    return message.channel.send('Improperly formatted birthday. Could not set.');
                }
                const user = yield db_1.User.findOneAndUpdate({ discordId: message.author.id }, { birthday: chrono.parseDate(bday) });
                message.channel.send(`Birthday set to ${date_fns_1.format(parsedBday, 'do MMMM')}`);
            }
            catch (e) {
                message.channel.send('You need to register using `moon!register` before setting a birthday!');
                console.error(e);
            }
        }
        if (subcommand === 'check') {
            const bdayUsers = yield birthday_check_1.checkForBirthdays();
            // console.log({ bdayUsers, msg: message.content });
            const bdayUserStrings = bdayUsers.map(user => `<@${user['discordId']}>`);
            if (bdayUserStrings.length === 0) {
                message.channel.send(`No birthdays today!`);
            }
            else if (bdayUserStrings.length === 1) {
                message.channel.send(`Happy birthday to ${bdayUserStrings[0]}`);
            }
            else {
                message.channel.send(`Happy birthday to:
${bdayUsers.slice(0, -1).join(',') + ', and ' + bdayUsers.slice(-1)}
        `);
            }
            // message.channel.send(`Feature not yet ready`);
        }
    }),
    cutie: ({ message, args, helpInfo = false }) => {
        if (helpInfo)
            return 'Decide if someone is a cutie (hint: you are)';
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
        }
        else {
            message.channel.send('Please provide a username');
        }
    },
    test: ({ message, args, helpInfo = false }) => {
        if (helpInfo)
            return 'Test if the bot server is working and online';
        message.channel.send(`I'm working and online!`);
    },
    default: ({ message, args }) => {
        message.channel.send('Please provide a valid command');
    },
    register: ({ message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (message.author.bot) {
                return message.channel.send(`Sorry, robots can't have an account! 💙`);
            }
            yield db_1.User.create({
                name: message.author.username,
                discordId: message.author.id,
                discriminator: message.author.discriminator,
                avatar: message.author.avatar,
                bot: message.author.bot,
            });
            return message.channel.send(`Account for ${message.author.username} created successfully`);
        }
        catch (e) {
            if (e.code === 11000) {
                return message.channel.send('It looks like you already have an account. No need to create a second one :) 💙💙💙');
            }
            message.channel.send('An unknown error occurred. Please contact Rahmen for support. 💙');
            console.log(e);
        }
    }),
};
//# sourceMappingURL=commands.js.map