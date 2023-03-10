import mongoose from "mongoose";

const createConnection = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected`);
    });
    
};

export {createConnection};
