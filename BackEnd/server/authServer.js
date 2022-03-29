const con = require("../config/db");

const getUserByUserEmail = async (email, callBack) => {
    con.query(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            return callBack(null, results[0])
        }
    )
}

module.exports = {
    getUserByUserEmail
}