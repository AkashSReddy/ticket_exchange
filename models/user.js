const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
salt_factor = 8;
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    ticket: String,
    seat: {
        type: String,
        enum: ["seat1", "seat2", "seat3"],
        default: "seat1"
    },
    trainid: Number,
});
userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(salt_factor), null);
};
module.exports = mongoose.model("user", userSchema);