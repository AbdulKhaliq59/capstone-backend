const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema({
  post_id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  post_title: {
    type: String,
    required: true
  },
  post_subtitles: [
    {
      subtitle: {
        type: String,
        required: true
      },
    }
  ],
  post_contents: [
    {
      content: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      }
    }
  ],
  post_images: [
    {
      imageUrl: String,
      subtitle: String
    }
  ],
  post_videos: [
    {
      videoUrl: String,
      subtitle: String
    }
  ],
  post_comments: [
    {
      user: {
        type: String
      },
      comment: {
        type: String
      },
    },
  ],
  post_category: {
    type: String,
    required: true
  },
  post_views: {
    type: Number,
    default: 0
  },
  post_likes: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  post_create_date: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
    }
  }
})

module.exports = mongoose.model('Post', schema)