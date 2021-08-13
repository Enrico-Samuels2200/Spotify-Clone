const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Request mongoose models
const { user_account, login_account } = require('../models/user_model');

format_date = () => {
    let new_date = new Date(),
        month = '' + (new_date.getMonth() + 1),
        day = '' + new_date.getDate(),
        year = new_date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [day, month, year].join('/');
}

router.post('/sign-up', async (req, res) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);

    const email_exist = await user_account.findOne({ email: req.body.email });
    const user_exist = await user_account.findOne({ username: req.body.username });

    // Validates if name and email entered is already connected to an account.
    if (email_exist) return res.status(400).send("Email already exist.") ;
    if (user_exist) return res.status(400).send("Username already taken");

    // Create new user
    const client_data = new user_account({
        email: req.body.email,
        username: req.body.username,
        password: hashed_password,
        date_created: format_date()
    });

    // Returns a promise
    try {
        console.log(client_data)
        await client_data.save();
        res.send("Account successfully created.");
    }
    catch (err) {
        res.send("An error occured");
    };
});

router.post('/login', async (req, res) => {

    const client_data = {
        email: req.body.email,
        password: req.body.password
    };

    // Looks for user's email
    const user = await user_account.findOne({ email: req.body.email });
    let validPassword = false;

    //const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (user != null) {
        validPassword = await bcrypt.compare(req.body.password, user.password);
    }

    // If the users email is not found then return error
    if (!user) return res.status(400).send("Invalid email or password entered.");
    if (!validPassword) return res.status(400).send('Invalid email or password entered.')

    // Sends the user a web roken to identify that he/she is logged in

    const token = jwt.sign({ _id: client_data._id }, process.env.token_secret);
    res.header('auth-token', token).send(token);
});

module.exports = router;