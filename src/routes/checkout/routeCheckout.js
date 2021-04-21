const express = require("express")
const Product = require("../../db/ProductSchema");
const Order  = require("../../db/OrderSchema");
const config = require('../../config');
const { default: fetch } = require("node-fetch");
const app = express.Router()


//create order
app.post("/order", async (req, res)=>{
    const {phone, name, address, email, province, nameProvince, district,nameDistrict, ward, nameWard, data} = req.body;
    var totalAmount = 0
    // check if quantity item > 0
    for (let element of data){
        let prod = await Product.findOne({_id: element.idItem, properties:{$elemMatch: {_id: element.idSize}}})
        let quan = prod.properties.filter(x =>  x._id == element.idSize)
        if(quan[0].quantity < element.quantity){
            return res.status(400).json({code: 400, msg: "Order thất bại (Quantity)"})
        }
    }
    for (let element of data){
        let prod = await Product.findById(element.idItem);
        if(prod){
            try{
                let docs = await Product.findOneAndUpdate({_id: element.idItem, properties:{$elemMatch: {_id: element.idSize}}}, 
                            {$inc: {"properties.$.quantity": -element.quantity}},
                            {'new': true, 'safe': true, 'upsert': true})
                if(docs){
                    totalAmount = totalAmount + (docs.price * element.quantity) 
                }
                
            }catch{
                return res.status(400).json({code: 400, msg: "Order thất bại (Product)"})
        }}
    };
    let feeShip = 0
    let calculateFee = await getFeeShip(district)
    if(calculateFee.code === 200){
        feeShip = calculateFee.data.total
    }
    Order.create({name: name, phone: phone, address: address, email: email, province: province,nameProvince: nameProvince, district: district, nameDistrict: nameDistrict, ward: ward, nameWard: nameWard, orderData: data, amount: totalAmount, createAt: Date.now(),feeShip: feeShip, orderCode: "", status: 0}, function(err, docs){
        if(err){
            return res.status(400).json({code: 400, msg: "Order thất bại"})
        }
        return res.status(200).json({code: 200, msg: "Order thành công", data: docs})
    })
})


//cancel order
app.post("/cancel",async (req, res)=>{
    const {id} = req.body;
    console.log(id)
    let ord = await Order.findById(id);
    if(ord){
        if(ord.status !== 0){
            return res.status(400).json({ code: 400, msg: "Hủy đơn hàng thất  bại (status)"})
        }
        let update = await Order.findByIdAndUpdate(id,{$set: {status: -1}})
        if (update){
            return res.status(200).json({code: 200, msg: "Hủy đơn hàng  thành công"})
        }
    }else{
        return res.status(400).json({code: 400, msg: "Hủy đơn hàng thất  bại (Không tìm thấy đơn hàng)"})
    }
})

//check order
app.get("/check/:id", async (req, res)=>{
    let check = await Order.findById(req.params.id)
    return res.status(200).json({code: 200, msg: check})
})

//calculate fee
app.post("/fee", async (req, res)=>{
    const {districtID} = req.body
    request = await getFeeShip(districtID)
    return res.status(200).json(request)
})


//get history
app.get("/history/:phone", async(req, res)=>{
    const {phone} = req.params
    let result = await Order.find({phone: phone})

    return res.status(200).json({code: 200, msg: result})
})

async function getFeeShip(districtID){
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
    return request
}
module.exports = app;