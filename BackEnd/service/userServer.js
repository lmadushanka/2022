const con = require("../config/db");

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO users(fullName,shortName,mobileNumber,email,address,password,userRole,route)
                    VALUES(?,?,?,?,?,?,?,?)`,
        [
            data.fullName,
            data.shortName,
            data.mobileNumber,
            data.email,
            data.address,
            data.password,
            data.userRole,
            data.route,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        }
    )
}

const checkExistingUser = async (email, callBack) => {
    await con.query(
        `SELECT * FROM users WHERE email = ?`,
        [
            email,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const getUsers = async callBack => {
    await con.query(
        `SELECT * FROM users`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    );
}

const getUserById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM users WHERE id = ?`,
        [
            id
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const updateUser = async (data, callBack) => {
    await con.query(
        `UPDATE users SET fullName=?, shortName=?,mobileNumber=?,email=?,address=?,password=?, userRole=?, route=? WHERE id=?`,
        [
            data.fullName,
            data.shortName,
            data.mobileNumber,
            data.email,
            data.address,
            data.password,
            data.userRole,
            data.route,
            data.id
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        }
    )
}

const deleteUser = async (id, callBack) => {
    await con.query(
        `DELETE FROM users WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}



module.exports = {
    create,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkExistingUser
}