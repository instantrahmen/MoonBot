export const debug = ({ message, args, error = null }) => {
  if (error) {
    message.channel.send(`
    **Error**
    ${'```'}
      ${error.message}
    ${'```'}
    `);
  }
  message.channel.send('💚 Check logs for debug info 💚');
  message.channel.send('💚 Message author info 💚');
  const nonCircularAuthor = { ...message.author };
  nonCircularAuthor.lastMessage = null;
  message.channel.send(
    `${'`'}${JSON.stringify(nonCircularAuthor, null, 2)}${'`'}`
  );

  console.log({ message, __auth: message.author });
};
