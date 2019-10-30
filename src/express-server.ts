import express from 'express';
import { User } from './db';

const app = express();

const PORT = process.env.PORT || 3069;

export const startExpressServer = () => {
  app.use(express.static('static'));

  app.get('/', (req, res) => {
    res.send('Server running');
  });

  app.get('/api/profiles/:id', async (req, res) => {
    const discordId = req.params.id;
    const user = await User.findOne({ discordId });

    res.send(user);
  });

  app.get('/api/profiles', async (req, res) => {
    const users = await User.find();

    res.send({ users });
  });

  app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
  });
};
