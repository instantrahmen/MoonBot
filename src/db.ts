import { connect, Document, Schema, Model, model } from 'mongoose';

export const db = connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

export const UserSchema = new Schema({
  name: String,
  discordId: { type: String, index: { unique: true } },
  birthday: Date,
  discriminator: Number,
  avatar: String,
  bot: Boolean,
  admin: Boolean,
  bio: String,
  exp: Number,
  level: Number,
  // inventory: ,
});

export const User = model('User', UserSchema);
