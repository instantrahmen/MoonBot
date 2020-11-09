// import * as schedule from 'node-schedule';
// import { User, db } from '../db';

// schedule.scheduleJob('0 0 * * *', () => {});

// export const startScheduledJob = ({ message }) => {
//   schedule.scheduleJob('0 0 * * *', async () => {
//     const bdayUsers = await checkForBirthdays();
//     const bdayUserStrings = bdayUsers.map(user => `<@${user['discordId']}>`);

//     if (bdayUserStrings.length === 0) {
//       // message.channel.send(`No birthdays today!`);
//     } else if (bdayUserStrings.length === 1) {
//       message.channel.send(`Happy birthday to ${bdayUserStrings[0]}`);
//     } else if (bdayUserStrings.length === 2) {
//       message.channel.send(
//         `Happy birthday to ${bdayUserStrings[0]} and ${bdayUserStrings[1]}`
//       );
//     } else {
//       message.channel.send(`Happy birthday to ${bdayUsers
//         .slice(0, -1)
//         .join(',') +
//         ', and ' +
//         bdayUsers.slice(-1)}
//         `);
//     }
//   });
// };

// export const checkForBirthdays = async () => {
//   const bdayUsers = await User.find({
//     $expr: {
//       $and: [
//         { $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: new Date() }] },
//         { $eq: [{ $month: '$birthday' }, { $month: new Date() }] },
//       ],
//     },
//   });

//   console.log({ bdayUsers });

//   return bdayUsers;
// };
