// Decide if someone is a cutie
export const cutie = ({ message, args }) => {
  if (args.length > 0) {
    const [providedUser] = args;

    const cutieRating = Math.floor(Math.random() * 10);

    switch (cutieRating) {
      case 1:
        message.channel.send(`> ${providedUser} is a huge cutie!`);
        break;
      case 2:
        message.channel.send(`> ${providedUser} is a super cutie!`);
        break;
      case 3:
        message.channel.send(`> ${providedUser} is a mega cutie!`);
        break;
      case 4:
        message.channel.send(`> ${providedUser} is a massive cutie!`);
        break;
      case 5:
        message.channel.send(`> ${providedUser} is a super huge cutie!`);
        break;
      case 6:
        message.channel.send(`> ${providedUser} is the biggest cutie!`);
        break;
      default:
        message.channel.send(`> ${providedUser} is a cutie!`);
    }
  } else {
    message.channel.send('Please provide a username');
  }
};
