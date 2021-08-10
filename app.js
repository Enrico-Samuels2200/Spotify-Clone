const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;

require('dotenv').config();

// Routes
const api = require('./routes/api');
const { connect } = require('./routes/user_auth');

app.use('/', api)


// Starts the server on the ports specified.
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server has started on port: ${server.address().port}`);
})