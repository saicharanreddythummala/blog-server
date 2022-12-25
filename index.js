import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from './config/db.js';
import { userRoute } from './routes/users.js';
import { postRoute } from './routes/posts.js';
import { categoryRoute } from './routes/categories.js';
import cloudinary from 'cloudinary';
import { errorMiddleWare } from './middleware/error.js';
import { contactRoute } from './routes/contact.js';


dotenv.config();

//db connection
createConnection();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/category/', categoryRoute);
app.use('/api/', contactRoute);

app.get('/', (req, res, next) => {
  res.send('Server is up');
});

//error middleware
app.use(errorMiddleWare);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
