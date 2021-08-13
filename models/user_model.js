const mongoose = require('mongoose');

// Schema for creating new user account
const sign_up_schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: String,
        required: false
    }
});

const user_account = mongoose.model('user_accounts', sign_up_schema);

module.exports = { user_account}