import * as schedule from 'node-schedule';
import { User, db } from './db';

schedule.scheduleJob('0 0 * * *', () => {});

export const checkForBirthdays = async () => {
  const bdayUsers = await User.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: new Date() }] },
        { $eq: [{ $month: '$birthday' }, { $month: new Date() }] },
      ],
    },
  });

  console.log({ bdayUsers });

  return bdayUsers;
};
