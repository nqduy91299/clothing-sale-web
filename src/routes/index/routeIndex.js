const express = require('express');
const Product = require("../../db/ProductSchema");
const app = express.Router();

//get all product
app.get("/", async (req, res)=>{
    const {page = 1, limit = 10} = req.query
    let result = await Product.find().limit(limit * 1).skip((page - 1) * limit).select(["-__v"]);
    let count = await Product.count()
    return res.status(200).json({code: 200, total: count, msg: result})
})

//get specific product
app.get("/product/:id", async (req, res)=>{
    let result = await Product.findById(req.params.id).select(["-__v"]);
    return res.status(200).json({code: 200, msg: result})
})
module.exports = app
