const con = require("../config/db");

const create = (data, callBack) => {
    con.query(
        `INSERT INTO stocktransfer(productId, inRouteId, toRouteId, stock, date, status)
                VALUES(?, ?, ?, ?, ?, ?)`,
        [
            data.productId,
            data.inRouteId,
            data.toRouteId,
            data.stock,
            data.date,
            data.status
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}



const getOneById = (id, callBack) => {
    con.query(
        `SELECT * FROM stocktransfer WHERE id = ?`,
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
        `SELECT * FROM stocktransfer`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getStockAmountByRoute = (data, callBack) => {
    con.query(
        `SELECT SUM(stock) AS stockAmount FROM stocktransfer WHERE productId = ? AND routeId = ?`,
        [
            data.productId,
            data.routeId
        ],
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
        `UPDATE stocktransfer SET stock=?,status=? WHERE id=?`,
        [
            data.stock,
            data.status,
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

const getAllStocksByProductIdOrderByASC = (id, callBack) => {
    con.query(
        `SELECT * FROM stocks WHERE productId = ? AND stock != 0 AND status = 1 AND routeId = 0 ORDER BY added_at ASC `,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getAllStocksByProductIdOrderByASCWith0Stock = (id, callBack) => {
    con.query(
        `SELECT * FROM stocks WHERE productId = ? AND status = 1 AND routeId = 0 ORDER BY stock ASC `,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getStocksCountByProductId = (id, callBack) => {
    con.query(
        `SELECT SUM(stock) AS stockAmount FROM stocks WHERE productId = ? AND routeId = 0`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

const updateStockCount = (data, callBack) => {
    con.query(
        `UPDATE stocks SET stock=? WHERE id=?`,
        [
            data.remainingStock,
            data.stockId
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const createStock = (data, callBack) => {
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

module.exports = {
    create,
    getOneById,
    getAll,
    update,
    getAllStocksByProductIdOrderByASC,
    getAllStocksByProductIdOrderByASCWith0Stock,
    getStocksCountByProductId,
    updateStockCount,
    getStockAmountByRoute,
    createStock,
}