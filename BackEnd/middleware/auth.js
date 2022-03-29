const { verify } = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, "1234", (err, decoded) => {
            if (err) {
                res.json({
                    success: 0,
                    msg: "Invalid token"
                });
            } else {
                next();
            }
        });
    } else {
        res.json({
            success: 0,
            msg: "Access denide! unauthorized user"
        })
    }
}

module.exports = {
    checkToken
}