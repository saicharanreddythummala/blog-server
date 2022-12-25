import express from 'express';
import { deleteUser, getUser, login, userRegister, userUpdate } from '../controllers/userController.js';

const route = express.Router();


route.post('/register',userRegister);
route.post('/login',login);
route.put('/update/:id',userUpdate)
route.delete('/delete/:id', deleteUser);
route.get('/:id', getUser);

export const userRoute = route;