import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './db.js';
import userRoutes from './routes/userRoutes.js';
const server = express();
const port = process.env.PORT;
const url = process.env.DB_URL;

// Middleware
 server.use(cookieParser());
 server.use(express.json());
 server.use(express.urlencoded({extended:true}))
 server.use(cors())
 server.use('/images', express.static('public'));
// Connection to database
connectToDatabase(url)
// Routes
server.use('/api',userRoutes)

// Start the server
server.listen(port, () => {
  console.log('Server started');
});
