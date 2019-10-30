import { User } from '../../db';

export const register = async ({ message, args }) => {
  try {
    if (message.author.bot) {
      return message.channel.send(`> Sorry, robots can't have an account! 💚`);
    }

    await User.create({
      name: message.author.username,
      discordId: message.author.id,
      discriminator: message.author.discriminator,
      avatar: message.author.avatar,
      bot: message.author.bot,
    });

    return message.channel.send(
      `> Account for ${message.author.username} created successfully`
    );
  } catch (e) {
    if (e.code === 11000) {
      return message.channel.send(
        '> It looks like you already have an account. No need to create a second one :) 💚'
      );
    }
    message.channel.send(
      '> An unknown error occurred. Please contact Rahmen for support. 💚'
    );
    console.log(e);
  }
};
