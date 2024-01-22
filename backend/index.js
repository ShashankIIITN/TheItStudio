import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import postRoutes from './routes/apis.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/', postRoutes);
const CONNECTION_URI = process.env.CONNECTION_URI || 'mongodb+srv://Shashank:RQ9Pj8W.rmkb3!$@saitma.hqkmz6j.mongodb.net/TheItStudio?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);

