// import { User } from '../../db';

// export const register = async ({ message, args, passive = false }) => {
//   try {
//     if (message.author.bot) {
//       return message.channel.send(`> Sorry, robots can't have an account! 💚`);
//     }

//     await User.create({
//       name: message.author.username,
//       discordId: message.author.id,
//       discriminator: message.author.discriminator,
//       avatar: message.author.avatar,
//       bot: message.author.bot,
//     });

//     return (
//       !passive &&
//       message.channel.send(
//         `> Account for ${message.author.username} created successfully`
//       )
//     );
//   } catch (e) {
//     if (e.code === 11000) {
//       return (
//         !passive &&
//         message.channel.send(
//           '> It looks like you already have an account. No need to create a second one :) 💚'
//         )
//       );
//     }
//     !passive &&
//       message.channel.send(
//         '> An unknown error occurred. Please contact Rahmen for support. 💚'
//       );
//     console.log(e);
//   }
// };

// export const updateUserInfo = async ({
//   message,
//   args,
//   bio = undefined,
//   color = undefined,
// }) => {
//   const updatedUserInfo = {
//     name: message.author.username,
//     discriminator: message.author.discriminator,
//     avatar: message.author.avatar,
//     bot: message.author.bot,
//     bio,
//     color,
//     level: 0,
//     exp: 0,
//   };

//   for (let prop in updatedUserInfo)
//     if (typeof updatedUserInfo[prop] === 'undefined')
//       delete updatedUserInfo[prop];

//   const newUser = await User.findOneAndUpdate(
//     { discordId: message.author.id },
//     updatedUserInfo
//   );

//   return newUser;
// };
