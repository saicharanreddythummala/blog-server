import { Users } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { Post } from '../models/postModel.js';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/errorHandler.js';

//user register
const userRegister = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
    });

    const user = await newUser.save();
    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//user login
const login = async (req, res, next) => {
  try {
    let user = await Users.findOne({ username: req.body.username });

    if (!user) {
      return next(new ErrorHandler('Invalid credentials!', 400));
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return next(new ErrorHandler('Invalid credentials!', 400));
    }

    user = user.toObject();

    delete user.password;

    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//update user
const userUpdate = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await Users.findById(req.params.id);

      // if (user.avatar) {
      //  const rest = await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      //  console.log(rest)
      // }

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
      });

      req.body.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } else {
    return next(new ErrorHandler('You can update only your account', 401));
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json('User deleted!');
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      return next(new ErrorHandler('User not found!', 404));
    }
  } else {
    return next(new ErrorHandler('You can delete only your account', 401));
  }
};

//get user
const getUser = async (req, res) => {
  try {
    let user = await Users.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler('user not found', 401));
    } else {
      user = user.toObject();

      delete user.password;
      res.status(200).json(user);
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export { userRegister, login, userUpdate, deleteUser, getUser };
