const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    trainid: Number,
    trainName: String,
    seat1: Number,
    seat2: Number,
    seat3: Number,
    coordinate: String
});

module.exports = mongoose.model("train", trainSchema);