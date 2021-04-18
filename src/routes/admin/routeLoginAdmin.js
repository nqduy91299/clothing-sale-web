const express = require("express")
const app = express.Router()
const Account = require("../../db/AccountSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.post("/login", async (req, res)=>{
    const {username, password} = req.body
    await Account.findOne({username: username}, function(err, docs){
        if(err){
            return res.status(500).json({code: 500, msg: "Lỗi server"})
        }
        if(!docs){
            return res.status(404).json({code: 404, msg: "Không tìm thấy người dùng"})
        }
        if(bcrypt.compareSync(password, docs.password)){
            return res.status(200).json({code: 200, msg: "Đăng nhập thành công", token: jwt.sign({username: username}, "SOA", {expiresIn: 86400}) })
        }else{
            return res.status(400).json({code: 400, msg: "Sai mật khẩu"})
        }
    })
})



module.exports = app