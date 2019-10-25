import express from 'express';

const app = express();

const PORT = process.env.PORT || 3069;

app.use(express.static('static'));

app.listen(PORT, () => {
  console.info(`listening on port ${PORT}`);
});
