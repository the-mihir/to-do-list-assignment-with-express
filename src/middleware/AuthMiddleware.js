const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers["token"];
   jwt .verify(token, "secretKey", (err, result) => {
        if (err) {
            res.json({
                status: 500,
                message: err.message
            });
        } else {
            let email = result.data;
            req.headers["email"] = email
            next();
        }
    })
}