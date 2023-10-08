import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; //? for success connect from client with current Url
import dotenv from 'dotenv';
import router from './routers/auth/routers.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

//midlware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://192.168.1.4:5173',
      'http://192.168.1.5:5173',
      'http://192.168.1.6:5173',
      'http://192.168.1.7:5173',
    ],
  })
);
app.use('/api', router);

// Connect mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
    // Start seerver
    app.listen(PORT, () => {
      console.log(`server is running: http://${HOST}:${PORT}`);
    });

    return;
  })
  .catch((error) => {
    console.log('mongoDB connection ERROR: \n' + error);
    return;
  });
