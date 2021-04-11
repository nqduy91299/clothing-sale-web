const {check,checkSchema} = require("express-validator")

module.exports = [
    check("name")
    .exists().withMessage('Vui lòng nhập tên sản phẩm')
    .notEmpty().withMessage('Tên sản phẩm không được để trống'),

    check("category")
    .exists().withMessage('Vui lòng nhập thuộc tính sản phẩm')
    .notEmpty().withMessage('Thuộc tính sản phẩm không được để trống'),

    check("price")
    .exists().withMessage('Vui lòng nhập giá sản phẩm')
    .notEmpty().withMessage('Giá sản phẩm không được để trống'),

    check("description")
    .exists().withMessage('Vui lòng nhập miêu tả sản phẩm')
    .notEmpty().withMessage('Miêu tả sản phẩm không được để trống'),

    // check("imageMain")
    // .exists().withMessage('Vui lòng tải ảnh chính'),
    check("imageMain")
    .custom((value, {req})=>{
        if (!req.files["imageMain"]) throw new Error ("Vui lòng tải ảnh chính");
        return true;
    }),

    check("imageArray")
    .custom((value, {req})=>{
        if (!req.files["imageArray"]) throw new Error ("Vui lòng tải ảnh sản phẩm");
        return true;
    }),
    // check("imageArray")
    // .exists().withMessage('Vui lòng tải ảnh sản phẩm'),

    check("properties")
    .exists().withMessage('Vui lòng nhập thông tin sản phẩm'),
    
]
function checkFile(field, req){
    req.forEach(element => {
        if(element.fieldname === field){
            return true
        }
    });
    return false
}