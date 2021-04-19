const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "SOA", (err, user) => {
            if (err) {
                return res.status(400).json({code: 400, msg: "Lỗi token"});
            }
            req.username = user.username;
            next();
        });
    } else {
        return res.status(401).json({code: 401, msg: "Unauthorized"})
    }
}

module.exports = auth