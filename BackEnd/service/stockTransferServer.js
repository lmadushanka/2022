const con = require("../config/db");

const create = async (data, callBack) => {
    await con.query(
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



const getOneById = async (id, callBack) => {
    await con.query(
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

const getAll = async callBack => {
    await con.query(
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



const update = async (data, callBack) => {
    await con.query(
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

const getAllStocksByProductIdOrderByASC = async (id, callBack) => {
    await con.query(
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

const getAllStocksByProductIdOrderByASCWith0Stock = async (id, callBack) => {
    await con.query(
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

const getStocksCountByProductId = async (id, callBack) => {
    await con.query(
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

const updateStockCount = async (data, callBack) => {
    await con.query(
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

const createStock = async (data, callBack) => {
    await con.query(
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
    createStock,
}