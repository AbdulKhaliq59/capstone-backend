const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  comments: [
    {
      username: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Post", schema);
