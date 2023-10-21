import  express, { response }  from "express"; //Server libraryfor node
import { PORT, mongoDBURL } from "./config.js"; //Config file
import mongoose, { Mongoose } from "mongoose"; // MongoDB connector library
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware fr parsing request body
app.use(express.json());

// Route for root, /, return a simple 200 response directly to the page
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN stack Tutorial');
})

// Route for saving a new Book
app.post('/books', async (request, response) => {
    try {
        // Check if all firelds are sent 
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // If all firelds are not sent, send an error message
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
            
        } // if all fields are filled out, go ahead and fill in the fields in a newBook
            const newBook = {
                title: request.body.title,
                author: request.body.author,
                publishYear: request.body.publishYear,
            };
        // create a new book and add it to the variable book
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}); 

// Route for Get All Books from database
app.get('/books', async (request, response) => {
    try {
        //find all books and save them in a books variable
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get one Book from database by id
app.get('/books/:id', async (request, response) => {
    try {
        //find a book by id and save it in a book variable
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book
app.put('/books/:id', async (request, response) => {
    try {
        // Check if all firelds are sent 
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // If all firelds are not sent, send an error message
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        // Find and update a book by id
        const result = await Book.findByIdAndUpdate(id, request.body);

        // Check the result
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book Updated successfully' }); 
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Deleting a book
app.delete('/books/:id', async(request, response) => {
    try {
        const { id } = request.params;
        // Find and delete a book by id
        const result = await Book.findByIdAndDelete(id);

        // Check the result
        if(!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book deleted successfully' }); 

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
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
