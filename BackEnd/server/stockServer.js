const con = require("../config/db");

const create = (data, callBack) => {
    con.query(
        `INSERT INTO stocks(productId,routeId,stock,added_at,status)
                VALUES(?,?,?,?,?)`,
        [
            data.productId,
            data.routeId,
            data.stock,
            data.added_at,
            data.status
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        }
    )
}

const getOne = (id, callBack) => {
    con.query(
        `SELECT * FROM stocks WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const getAll = callBack => {
    con.query(
        `SELECt * FROM stocks`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

const getStockByRouteProduct = (data, callBack) => {
    con.query(
        `SELECT SUM(stock) AS stock FROM stocks WHERE  routeId = ? AND productId = ?`,
        [
            data.routeId,
            data.productId
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

const getRouteIdNull = callBack => {
    con.query(
        `SELECT * FROM stocks WHERE routeId = 0`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

const getStockByRouteId = (routeId, callBack) => {
    con.query(
        `SELECT * FROM stocks WHERE routeId = ? AND stock != 0 ORDER BY productId`,
        [routeId],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

getAllStockGroupByProduct = callBack => {
    con.query(
        `SELECT * FROM stocks WHERE routeId = 0 AND stock != 0 ORDER BY productId`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

const update = (data, callBack) => {
    con.query(
        `UPDATE stocks SET stock=? WHERE id=?`,
        [
            data.stock,
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

const deleteOne = (id, callBack) => {
    con.query(
        `DELETE FROM stocks WHERE id = ?`,
        [id],
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
    getOne,
    getAll,
    update,
    deleteOne,
    getRouteIdNull,
    getAllStockGroupByProduct,
    getStockByRouteId,
    getStockByRouteProduct
}