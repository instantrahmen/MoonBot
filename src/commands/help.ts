export const helpInfo = {
  help: { desc: `Show the commands and how to use them`, usage: `moon!help` },
  boop: { desc: `Boop somebody`, usage: `moon!boop <user>` },
  poke: { desc: `Poke somebody`, usage: `moon!poke <user>` },
  apple: { desc: `Give somebody an apple!`, usage: `moon!apple <user>` },
  hug: { desc: `Give somebody a hug!`, usage: `moon!hug <user>` },
  birthday: {
    desc: `Remember birthdays`,
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

export const help = ({ message, args }) => {
  const commandHelpInfo = [
    '[**Note:** This list will grow as I continue to work on the bot]',

    '**MoonBot Commands:**',
    ...Object.keys(helpInfo).map(
      commandName =>
        helpInfo[commandName] &&
        `**moon!${commandName}:** \n    ${
          helpInfo[commandName].desc
        } \n    **usage:** ${'`' + helpInfo[commandName].usage + '`'}`
    ),
  ];
  message.channel.send(commandHelpInfo.filter(cmd => !!cmd).join('  \n'));
};
