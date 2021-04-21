const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Account = require("./src/db/AccountSchema")

mongoose.connect('mongodb://localhost:27017/SOA', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

Account.create({username: "hienvuong", password: bcrypt.hashSync("123123123", 10), role: 1, name: "Hien Vuong", })