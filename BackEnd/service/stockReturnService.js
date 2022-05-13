const con = require('../config/db');

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO stockreturn(productId,routeId,qty,reason,note,status,created_at)
                VALUES(?,?,?,?,?,?,?)`,
        [
            data.productId,
            data.routeId,
            data.returnQty,
            data.reason,
            data.note,
            data.status,
            data.created_at
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const stockReturnById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM stockreturn WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) return callBack(err)

            return callBack(null, results[0]);
        }
    )
}

const updateStatus = async (data, callBack) => {
    await con.query(
        `UPDATE stockreturn SET status= ?, updated_at= ? WHERE id = ?`,
        [
            data.status,
            data.updated_at,
            data.id
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

module.exports = {
    create,
    stockReturnById,
    updateStatus
}