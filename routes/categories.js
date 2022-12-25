import express from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/categoryController.js';

const route = express.Router();

route.post('/new', createCategory);
route.get('/', getCategories);

export const categoryRoute = route;
