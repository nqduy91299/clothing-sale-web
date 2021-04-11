const express = require('express');
const {validationResult} = require("express-validator")
const Product = require("../../db/ProductSchema")
const createProduct = require("./validators/validatorCreateProduct")
const app = express.Router();
const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/images");
    },
});
app.use(multer({storage: storage}).fields([{name: "imageMain", maxCount: 1 }, {name: "imageArray", maxCount: 8 }]))
//create product
app.post("/create",createProduct, (req, res)=>{
    const {name, category, price, description, properties} = req.body;
    console.log(JSON.parse(properties))
    let validation = validationResult(req)
    if(validation.errors.length === 0 ){
        let arrImageArray = []
        req.files["imageArray"].forEach(element => {
            arrImageArray.push(element.filename)
        });
        Product.create({name: name, category:category, price:price, description:description,properties:JSON.parse(properties),imageArray: arrImageArray, imageMain: req.files["imageMain"][0].filename}, function(err,docs){
            if(err)
                return res.status(400).json({msg:"Đăng sản phẩm thất bại", err: err})
            return res.status(200).json({msg:"Đăng sản phẩm thành công"})
        })
    }else{
        return res.send(validation.errors)
    } 
})





module.exports = app;