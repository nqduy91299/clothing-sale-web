const express = require("express")
const Product = require("../../db/ProductSchema");
const Order  = require("../../db/OrderSchema");
const config = require('../../config');
const { default: fetch } = require("node-fetch");
const app = express.Router()


//create order
app.post("/order", async (req, res)=>{
    const {phone, name, address, email, province, district, ward, data} = req.body;
    var totalAmount = 0
    for await(let element of data){
        let prod = await Product.findById(element.id);
        if(prod){
            for await(let order of element.data){
               await Product.findOneAndUpdate({_id: element.id, properties:{$elemMatch: {size: order.size}}}, 
                                            {$inc: {"properties.$.quantity": -order.quantity}},
                                            {'new': true, 'safe': true, 'upsert': true},
                                            function(err, docs){
                                                if(err){
                                                    return res.status(400).json({msg: "Order thất bại (Product)"})
                                                }
                                                totalAmount = totalAmount + (docs.price * order.quantity)   

                                            })
            }
        }
    };
    Order.create({name: name, phone: phone, address: address, email: email, province: province, district: district, ward: ward, orderData: data, amount: totalAmount, orderCode: "", status: 0}, function(err, docs){
        if(err){
            return res.status(400).json({msg: "Order thất bại"})
        }
        return res.status(200).json({msg: "Order thành công"})
    })
})


//cancel order
app.post("/cancel",async (req, res)=>{
    const {id} = req.body;
    console.log(id)
    let ord = await Order.findById(id);
    if(ord){
        if(ord.status !== 0){
            return res.status(400).json({msg: "Hủy đơn hàng thất  bại (status)"})
        }
        let update = await Order.findByIdAndUpdate(id,{$set: {status: -1}})
        if (update){
            return res.status(200).json({msg: "Hủy đơn hàng  thành công"})
        }
    }else{
        return res.status(400).json({msg: "Hủy đơn hàng thất  bại (Không tìm thấy đơn hàng)"})
    }
})

//check order
app.get("/check/:id", async (req, res)=>{
    let check = await Order.findById(req.params.id)
    return res.status(200).json(check)
})

//calculate fee
app.post("/fee", async (req, res)=>{
    const {districtID} = req.body
    let request = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",{
            method: "POST",
            headers: {
                token: config.tokenGHN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "from_district_id":1449,
                "insurance_value": 1000000,
                "service_type_id": 2,
                "to_district_id": districtID,
                "height":10,
                "length":10,
                "weight":500,
                "width":5,
                "coupon": null,
                "service_id": null
            })
    })
    request = await request.json()
    return res.status(200).json(request)
})
module.exports = app;