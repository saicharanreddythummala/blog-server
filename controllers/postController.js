import { Post } from '../models/postModel.js';
import cloudinary from 'cloudinary';

//create post
const newPost = async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: 'blog',
  });

  req.body.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//get post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//get posts
const getPosts = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        category: catName 
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await cloudinary.v2.uploader.destroy(post.image.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
          folder: 'blog',
        });

        req.body.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        return next(new ErrorHandler(err.message, 500));
      }
    } else {
      return next(new ErrorHandler('You can update only your post!', 401));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//delete post
const deletePost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post deleted!');
      } catch (err) {
       return next(new ErrorHandler(err.message, 500));
      }
    } else {
      return next(new ErrorHandler('You can delete only your post!', 401));
    }
  } catch (err) {
   return next(new ErrorHandler(err.message, 500));
  }
};

export { newPost, getPost, getPosts, updatePost, deletePost };
