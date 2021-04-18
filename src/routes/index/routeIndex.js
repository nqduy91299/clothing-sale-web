const express = require('express');
const Product = require("../../db/ProductSchema");
const app = express.Router();

//get all product
app.get("/", async (req, res)=>{
    let result = await Product.find().select(["-__v"]);

    return res.status(200).json({code: 200, msg: result})
})

//get specific product
app.get("/product/:id", async (req, res)=>{
    let result = await Product.findById(req.params.id).select(["-__v"]);
    return res.status(200).json({code: 200, msg: result})
})
module.exports = app
