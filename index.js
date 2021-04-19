const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
const app = express()

app.use(cors())
app.use("/public", express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth = require("./src/utils/auth")
const routeManageProduct = require("./src/routes/admin/routeManageProduct")
const routeIndex = require("./src/routes/index/routeIndex")
const routeAddress = require("./src/routes/checkout/routeGetAddressCheckout")
const routeCheckout = require("./src/routes/checkout/routeCheckout")
const routeManageOrder = require("./src/routes/admin/routeManageOrder")
const routeLoginAdmin = require("./src/routes/admin/routeLoginAdmin")

app.use("/admin",auth, routeLoginAdmin)
app.use("/admin",auth,  routeManageProduct);
app.use("/admin/order",auth, routeManageOrder)
app.use("/", routeIndex);
app.use("/checkout",routeAddress)
app.use("/checkout",routeCheckout)

mongoose.connect('mongodb://localhost:27017/SOA', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.listen(8080, ()=>{
    console.log("Run OK");
})
