import mongoose from 'mongoose';

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Categories = mongoose.model('categories', categoryModel);
