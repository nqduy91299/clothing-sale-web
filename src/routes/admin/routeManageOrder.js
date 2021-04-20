const express = require("express")
const app = express.Router()
const Order = require("../../db/OrderSchema")
const Product = require("../../db/ProductSchema");
const config = require('../../config');
const { default: fetch } = require("node-fetch");

//get list confirm order
app.get("/", async (req, res)=>{
    await Order.find({status: 0}, function(err, docs){
        if (err){
            return res.status(400).json({msg: "Lỗi không tìm thấy Order"})
        }
        return res.status(200).json(docs)
    })
})

//confirm an order
app.post("/confirm",async (req, res)=>{
    const {orderID} = req.body
    Order.findById(orderID, function(err, docs){
        if(err)
            return res.status(400).json({code: 400, msg: "Không tìm thấy đơn hàng (1)"})
        if(docs.status !== 0)
            return res.status(400).json({code: 400, msg: "Cập nhật trạng thái đơn hàng thất bại"})
        
        Order.findByIdAndUpdate(orderID, {$set: {status: 1}}, function(err, docs){
            if(err)
                return res.status(400).json({code: 400, msg: "Không tìm thấy đơn hàng (2)"})
            return res.status(200).json({code: 200, msg: "Cập nhật trạng thái đơn hàng thành công"})
        })
    })

})
//create ticket
app.post("/ticket", async (req, res)=>{
    const {orderID} = req.body
    Order.findById(orderID, async function(err, docs){
        if(err){
            return res.status(400).json({code: 400, msg: "Không tìm thấy đơn hàng"})
        }
        if(docs.status === 1){
            let items =await createItems(docs)
            let result = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",{
                method: "POST",
                headers:{
                    token: config.tokenGHN,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "to_name": docs.name,
                    "to_phone": docs.phone,
                    "to_address": docs.address,
                    "to_ward_code": docs.ward,
                    "to_district_id": docs.district,
                    "cod_amount": docs.amount,
                    "weight": 1000,
                    "length": 10,
                    "width": 5,
                    "height":10,
                    "service_type_id": 1,
                    "payment_type_id": 2,
                    "required_note": "KHONGCHOXEMHANG",
                    "items":items
                })
            })
            result = await result.json()
            if (result.code === 200){
                Order.findByIdAndUpdate(orderID,{$set: {status: 2, orderCode: result.data.order_code}}, function(err, docs){
                    if(err)
                        return res.status(400).json({code: 400, msg: "Lỗi cập nhật đơn hàng"})
                    return res.status(200).json({code: 200, msg: "Cập nhật đơn hàng thành công"})
                })  
            }else{
                return res.status(400).json({code: 400, msg: "Cập nhật đơn hàng thất bại", err: result})
            }
            
        }else{
            return res.status(400).json({code: 400, msg: "Cập nhật đơn hàng thất bại (status)"})
        }
        

    })
})

//delete ticket
app.post("/cancel", async (req, res)=>{
    const {orderID} = req.body

    await Order.findById(orderID,async function(err, docs){
        if(err){
            return res.status(400).json({code: 400, msg: "Không tìm thấy đơn hàng"})
        }else{

            let result = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",{
                method: "POST",
                headers:{
                    token: config.tokenGHN,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "order_codes": [docs.orderCode]
                })
            })
            result = await result.json()

            if(result.code === 200){
                Order.findByIdAndUpdate(orderID, {$set: {status: -2,}}, function(err, docs){
                    if(err){
                        return res.status(400).json({code: 400, msg: "Hủy đơn hàng thất bại"})
                    }else{
                        return res.status(200).json({code: 200, msg: "Hủy đơn hàng thành công"})
                    }                    
                })
            }else{
                return res.status(400).json({code: 400, msg: "Hủy đơn hàng thất bại (code)"})
            }
        }
    })



})


//get history
app.get("/history", async (req, res)=>{
    let history = await Order.find()
    return res.status(200).json({code: 200, msg: history})
})



async function createItems(documents){
    let items = []
    for await(let element of documents.orderData){
        console.log(element)
        let quantity = element.quantity
        let name = ""
        await Product.findById(element.idItem, function(err, docs){
            name = docs.name 
            items.push({
                name: name,
                quantity: quantity
            })            
        });
    }
    return items
}


module.exports = app