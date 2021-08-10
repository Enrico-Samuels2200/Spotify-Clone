const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;

require('dotenv/config');

// Routes
const api = require('./routes/user_auth');

app.use('/auth', api)

// Connects to the MongoDB
//mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })

// Starts the server on the ports specified.
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server has started on port: ${server.address().port}`);
})