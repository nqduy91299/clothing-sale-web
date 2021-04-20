const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const AccountSchema = require('./src/db/AccountSchema');
mongoose.connect('mongodb://localhost:27017/SOA', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const account1 = new AccountSchema({
    username: "nguyenduy",
    password: bcrypt.hashSync('123123123', 10),
    role: 1,
    username: "nguyenduy",
    email: "nguyenduy@gmail.com",
    // role == 1 : ADMIN

})
account1.save()
