const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    category: Number,
    price: Number,
    description: String,
    imageMain: String,
    imageArray: Array,
    properties:[{
        size: String,
        quantity: Number,
    }],
    

        
    
})

let Product = mongoose.model("Product", ProductSchema, "Products")

module.exports = Product