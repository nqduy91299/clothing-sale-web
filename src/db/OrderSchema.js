const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    phone: String,
    name: String,
    email: String,
    address: String,
    province: String,
    district: String,
    ward: String,
    orderData: [{
        idItem: String,
        idSize: String,
        quantity: Number,
    }],
    amount: Number,
    feeShip: Number,
    orderCode: String,
    status: Number
    // status == -2 : CANCEL SHIPPING
    // status == -1 : CANCEL ORDER
    // status == 0 : ORDERED -> CREATE order
    // status == 1 : CONFIRMED -> admin phải confirm
    // status == 2 : SHIPPING -> 


})

let Order = mongoose.model("Order", OrderSchema, "Orders")
module.exports = Order