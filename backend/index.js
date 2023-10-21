import  express, { response }  from "express";
import { PORT } from "./config.js";

const app = express();

// Route for root, /, return a simple 200 response directly to the page
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN stack Tutorial');
})

//Listen to the port and console log it
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
