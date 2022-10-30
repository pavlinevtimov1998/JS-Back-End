const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is requried!"],
      minLength: [5, "Title should be at least 5 characters!"],
      maxLength: [50, "Title should be maximum of 50 characters!"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content is required!"],
      minLength: [10, "Content should be at least 10 characters!"],
    },
    imageUrl: {
      type: String,
      trim: true,
      required: [true, "Image URL is required!"],
      validate: {
        validator: function (value) {
          return /^((https:\/\/)|(http:\/\/))/g.test(value);
        },
        message: () => "Image URL should start with http:// or https:// !",
      },
    },
    blogCategory: {
      type: String,
      required: [true, "Blog category is required!"],
      minLength: [3, "Category should be at least 3 characters!"],
    },
    _ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followList: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
  },

  { timestamps: { createdAt: "createdAt" } }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
