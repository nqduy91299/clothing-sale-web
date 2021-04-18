const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    role: Number,
    username: String,
    email: String,
    // role == 1 : ADMIN

})

let Accounts = mongoose.model("Accounts", AccountSchema, "Accounts")
module.exports  = Accounts