const express = require('express');
const {validationResult} = require("express-validator")
const Product = require("../../db/ProductSchema")
const createProduct = require("./validators/validatorCreateProduct")
const updateProduct = require("./validators/validatorUpdateProduct")
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
    let validation = validationResult(req)
    if(validation.errors.length === 0 ){
        let arrImageArray = []
        req.files["imageArray"].forEach(element => {
            arrImageArray.push(element.filename)
        });
        Product.create({name: name, category:category, price:price, description:description,properties:JSON.parse(properties),imageArray: arrImageArray, imageMain: req.files["imageMain"][0].filename}, function(err,docs){
            if(err){
                return res.status(400).json({code: 400, msg:"Đăng sản phẩm thất bại", err: err})
            }
            else{
                return res.status(200).json({code: 200, msg:"Đăng sản phẩm thành công"})
            }
            
        })
    }else{
        return res.status(400).json({code: 400, msg: validation.errors})
    } 
})

//update product
app.post("/update",updateProduct, (req, res)=> {
    const {id, name, category, price, description, properties} = req.body;
    let validation = validationResult(req)
    if(validation.errors.length === 0 ){
        let arrImageArray = []
        req.files["imageArray"].forEach(element => {
            arrImageArray.push(element.filename)
        });
        Product.findByIdAndUpdate(id,{name: name, category:category, price:price, description:description,properties:JSON.parse(properties),imageArray: arrImageArray, imageMain: req.files["imageMain"][0].filename}, function(err,docs){
            if(err){
                return res.status(400).json({code: 400, msg:"Cập nhật sản phẩm thất bại", err: err})
            }else{
                return res.status(200).json({code: 200, msg:"Cập nhật sản phẩm thành công"})
            }
        })
    }else{
        return res.status(400).json({code: 400, msg: validation.errors})
    } 
})  



//delete product
app.post("/delete",async (req, res)=>{
    const {id} = req.body
    if(id){
        await Product.findByIdAndDelete(id, function(err, doc){
            if(err){
                return res.status(400).json({ code: 400, msg: "Xóa sản phẩm thất bại (err)"})
            }else{
                return res.status(200).json({code: 200, msg: "Xóa sản phẩm thành công"})
            }
        })
    }else{
        return res.status(400).json({code: 400, msg: "Xóa sản phẩm thất bại (id)"})
    }
})



module.exports = app;