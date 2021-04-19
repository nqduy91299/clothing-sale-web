const express = require('express');
const nodefetch = require('node-fetch')
const config = require('../../config')
const app = express.Router();

//get province
app.get("/province",async (req, res)=>{
    let listProvince = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",{
        headers: {
            token: config.tokenGHN
        }
    })
    listProvince = await listProvince.json()
    return res.json(listProvince);
})
//get district
app.get("/district/:id",async (req, res)=>{
    let listDistrict = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id="+ req.params.id,{
        headers: {
            token: config.tokenGHN
        }
    })
    listDistrict = await listDistrict.json()
    return res.json(listDistrict);
})
//get ward
app.get("/ward/:id",async (req, res)=>{
    let listWard = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" + req.params.id,{
        headers: {
            token: config.tokenGHN
        }
    })
    listWard = await listWard.json()
    return res.json(listWard);
})

//get ward by code
app.get("/ward/:idDistrict/:wardCode",async (req, res)=>{
    const idDistrict= req.params.idDistrict;
    const wardCode= req.params.wardCode;
    let listWard = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" + idDistrict,{
        headers: {
            token: config.tokenGHN
        }
    })
    listWard = await listWard.json()
    let wardById = listWard.data.find(item => {
        return item.WardCode === wardCode;
    })
    if(wardById){
        return res.status(200).json({code: 200, msg: 'Success', data: wardById})
    }else{
        return res.status(400).json({code: 400, msg: 'Can not found ward!'})
    }
})

//get district by id
app.get("/district/:idProvince/:idDistrict",async (req, res)=>{
    const idProvince = req.params.idProvince;
    const idDistrict = req.params.idDistrict;
    let listDistrict = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id="+ idProvince,{
        headers: {
            token: config.tokenGHN
        }
    })
    listDistrict = await listDistrict.json()
    let DistrictById = listDistrict.data.find(item => {
        return item.DistrictID === idDistrict*1;
    })
    if(DistrictById){
        return res.status(200).json({code: 200, msg: 'Success', data: DistrictById})
    }else{
        return res.status(400).json({code: 400, msg: 'Can not found district!'})
    }
})


//get province by id
app.get("/province/:id",async (req, res)=>{
    const id = req.params.id;
    let listProvince = await nodefetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",{
        headers: {
            token: config.tokenGHN
        }
    })
    listProvince = await listProvince.json()
    let ProvinceById = listProvince.data.find(item => {
        return item.ProvinceID === id*1;
    })
    if(ProvinceById){
        return res.status(200).json({code: 200, msg: 'Success', data: ProvinceById})
    }else{
        return res.status(400).json({code: 400, msg: 'Can not found province!'})
    }
})
module.exports = app