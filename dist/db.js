"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.db = mongoose_1.connect('mongodb+srv://erika:IyR25K*Cx2rc@cluster0-2jfl5.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    discordId: { type: String, index: { unique: true } },
    birthday: Date,
    discriminator: Number,
    avatar: String,
    bot: Boolean,
});
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=db.js.map