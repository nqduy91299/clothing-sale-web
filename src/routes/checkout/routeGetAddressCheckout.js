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


module.exports = app