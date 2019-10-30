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
  console.log({ message });
};
