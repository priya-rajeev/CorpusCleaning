const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser-ext');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started at ${3000}`)
})


require('dotenv').config();
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routes/routes');
app.use('/api', routes)