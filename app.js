const express = require('express');
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

require('dotenv/config');

// Middleware (Uses the imported route from "routes" directory)
app.use(bodyParser.json({ extended: true }));
app.use(cors());

// Routes
const api = require('./routes/user_auth');
const data = require('./routes/scrape');

app.use('/auth', api)
app.use('/data', data)

// Connects to the MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connected");
}).catch(err => {
    console.log(`An error occured\n${err.message}`);
})

// Starts the server on the ports specified.
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server has started on port: ${server.address().port}`);
})