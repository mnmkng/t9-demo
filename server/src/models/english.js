const mongoose = require("mongoose");
const wordSchema = require("./wordSchema");

const EnglishModel = mongoose.model("english", wordSchema);

module.exports = EnglishModel;