const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const WordSchema = new mongoose.Schema({
  mandarin: {
    type: String,
    required: true,
    trim: true,
  },
  pinyin: {
    type: String,
    required: true,
    trim: true,
  },
  english: {
    type: String,
    required: true,
    trim: true,
  },
  wordId: {
    type: Number,
  },
});

WordSchema.plugin(timestamp);
const Word = mongoose.model("Word", WordSchema);
module.exports = Word;
