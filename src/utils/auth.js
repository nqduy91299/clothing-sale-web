const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "SOA", (err, user) => {
            if (err) {
                return res.status(400).json({msg: "Lỗi token"});
            }
            req.username = user.username;
            next();
        });
    } else {
        return res.status(401).json({msg: "Unauthorized"})
    }
}

module.exports = auth