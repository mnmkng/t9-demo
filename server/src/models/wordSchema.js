const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    freq: {
      type: Number,
      required: true
    }
  }
);

module.exports = wordSchema;