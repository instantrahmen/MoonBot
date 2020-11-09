// import * as chrono from 'chrono-node';
// import { format, parse } from 'date-fns';

// import { User } from '../../db';
// import { checkForBirthdays } from '../birthday-check';

// export const birthday = async ({ message, args }) => {
//   const [subcommand, ...bdayArray] = args;
//   const bday = bdayArray.join(' ');
//   if (subcommand === 'set') {
//     try {
//       const parsedBday = chrono.parseDate(bday);

//       if (parsedBday === null) {
//         return message.channel.send(
//           'Improperly formatted birthday. Could not set.'
//         );
//       }
//       const user = await User.findOneAndUpdate(
//         { discordId: message.author.id },
//         { birthday: chrono.parseDate(bday) }
//       );

//       message.channel.send(`Birthday set to ${format(parsedBday, 'MMMM do')}`);
//     } catch (e) {
//       message.channel.send(
//         'You need to register using `moon!register` before setting a birthday! 💚'
//       );
//       console.error(e);
//     }
//   }

//   if (subcommand === 'check') {
//     const bdayUsers = await checkForBirthdays();
//     // console.log({ bdayUsers, msg: message.content });
//     const bdayUserStrings = bdayUsers.map(user => `<@${user['discordId']}>`);
//     if (bdayUserStrings.length === 0) {
//       message.channel.send(`No birthdays today!`);
//     } else if (bdayUserStrings.length === 1) {
//       message.channel.send(`Happy birthday to ${bdayUserStrings[0]}`);
//     } else {
//       message.channel.send(`Happy birthday to:
// ${bdayUsers.slice(0, -1).join(',') + ', and ' + bdayUsers.slice(-1)}
//       `);
//     }
//     // message.channel.send(`Feature not yet ready`);
//   }
// };
