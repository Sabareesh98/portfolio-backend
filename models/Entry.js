const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    howDidYouKnow: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
