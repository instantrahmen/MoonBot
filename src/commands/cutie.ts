export const cutie = ({ message, args }) => {
  if (args.length > 0) {
    const cutieRating = Math.floor(Math.random() * 7);

    switch (cutieRating) {
      case 1:
        message.channel.send(`> ${args[0]} is a huge cutie!`);
        break;
      case 2:
        message.channel.send(`> ${args[0]} is a super cutie!`);
        break;
      case 3:
        message.channel.send(`> ${args[0]} is a mega cutie!`);
        break;
      case 4:
        message.channel.send(`> ${args[0]} is a massive cutie!`);
        break;
      case 5:
        message.channel.send(`> ${args[0]} is a super huge cutie!`);
        break;
      case 6:
        message.channel.send(`> ${args[0]} is the biggest cutie!`);
        break;
      default:
        message.channel.send(`> ${args[0]} is a cutie!`);
    }
  } else {
    message.channel.send('Please provide a username');
  }
};
