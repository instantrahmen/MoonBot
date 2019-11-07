import { getRandomGifFromArray } from '../gif';

const gifs = [
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boop_bitch.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Neko_Baby_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Hoody_Tsuki_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Punk_Tsuki_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/TsuCowmoon_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/LunaBoop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Adult_Tsuki_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Witch_Tsuki_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Neko_Baby_Boop_Barrage.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Teen_Tsuki_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Thicc_Baby_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Bunny_Baby_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Cutie_Baby_Boop.gif',
  'https://pointsmap.sfo2.digitaloceanspaces.com/rahmen/moonbot/boops/Loli_Neko_Baby_Boop.gif',
];

export const boop = async ({ message, args }) => {
  let gif = getRandomGifFromArray({ images: gifs });

  if (args.length >= 1) {
    message.channel.send(`> *${message.member.user} boops ${args[0]}!*`, {
      files: [gif],
    });
  } else {
    message.channel.send(`> *${message.member.user} boops... nobody?!*`, {
      files: [gif],
    });
  }
};
