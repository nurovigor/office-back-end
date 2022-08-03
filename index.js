import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import tableRoute from './routes/tables.js';
import developersRoute from './routes/developers.js';

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
//http://localhost:3003/api/table

app.use('/api/tables', tableRoute)

//http://localhost:3003/api/developers
app.use('/api/developers', developersRoute)


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.4ut0evy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,);
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();