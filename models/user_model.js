const mongoose = require('mongoose');

// Schema for creating new user account
const sign_up_schema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const new_user = mongoose.model("Account", sign_up_schema, "user_accounts");

module.export = {
    new_user
}