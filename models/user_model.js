const mongoose = require('mongoose');

// Schema for creating new user account
const sign_up_schema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const login_schema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const user_account = mongoose.model("Account", sign_up_schema, "user_accounts");
const login_account = mongoose.model("Login_Account", login_schema, "user_accounts");


module.export = {
    user_account,
    login_account
}