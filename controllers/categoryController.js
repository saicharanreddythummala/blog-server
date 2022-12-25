import { Categories } from '../models/CategoryModel.js';

//create category
const createCategory = async (req, res) => {
  const newCat = new Categories(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//get categories
const getCategories = async (req, res) => {
  try {
    const cats = await Categories.find();
    res.status(200).json(cats);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export { createCategory, getCategories };
