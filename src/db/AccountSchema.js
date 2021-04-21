const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    role: Number,
    name: String,
    // role == 1 : ADMIN

})

let Accounts = mongoose.model("Accounts", AccountSchema, "Accounts")
module.exports  = Accounts