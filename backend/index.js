import  express from "express"; //Server library for node
import * as dotenv from 'dotenv';
import { PORT } from "./config.js"; //Config file
import mongoose from "mongoose"; // MongoDB connector library
import booksRoute from './routes/booksRoute.js'; // Book routes
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Allow All Origins with Default of cors(*)
app.use(cors());
// Allow Custom Origins
//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowHeaders: ['Content-Type'],
//    })
//);

// Route for root, /, return a simple 200 response directly to the page
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN stack Tutorial');
})

app.use('/books', booksRoute);

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('App connectod to database');
        //Listen to the port and console log it
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(() => {
        console.log('error');
    });
