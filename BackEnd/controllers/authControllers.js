const { getUserByUserEmail } = require("../service/authServer");

const { verify } = require("jsonwebtoken");

const { compareSync } = require("bcryptjs");

const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {

        if (err) { 
            console.log(err);
        }

        if (!results) { 
            return res.json({
                success: 0,
                msg: "Invalid email or password"
            });
        }

        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "1234", {
                expiresIn: "8h"
            });

            return res.json({
                success: 1,
                msg: "Login Success!",
                data: results,
                token: jsontoken
            });

        } else {
            return res.json({
                success: 0,
                msg: "Invalid email or password"
            });
        }
    });
}

const checkTokenByToken = async (req, res) => {
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
                res.json({
                    success: 1,
                    msg: "Access success"
                });
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
    login,
    checkTokenByToken
}