import express from 'express';
import { deletePost, getPost, getPosts, newPost, updatePost } from '../controllers/postController.js';

const route = express.Router();


route.get('/', getPosts);
route.post('/new',newPost);
route.put('/update/:id',updatePost)
route.delete('/delete/:id', deletePost);
route.get('/:id', getPost);

export const postRoute = route;