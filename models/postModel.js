import mongoose from 'mongoose';

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('post', postModel);
