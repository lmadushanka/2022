const con = require('../config/db');

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO stocktransfer(routeId,productId,qty,recieved,status,created_at,
            updated_at,deleted_at)
                VALUES(?,?,?,?,?,?,?,?)`,
        [
            data.routeId,
            data.productId,
            data.qty,
            data.status,
            data.status,
            data.created_at,
            data.updated_at,
            data.deleted_at,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const allStockTransfer = async callBack => {
    await con.query(
        `SELECT * FROM stocktransfer WHERE deleted_at IS NULL`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const stockTransferById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM stocktransfer WHERE id = ? AND deleted_at IS NULL`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

const stockTransferByRouteIdAndProductId = async (data, callBack) => {
    await con.query(
        `SELECT * FROM stocktransfer WHERE productId = ? AND routeId = ? AND deleted_at IS NULL`,
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

const stockTransferSumByProductIdAndRouteId = async (data, callBack) => {
    await con.query(
        `SELECT SUM(qty) AS totalQty FROM stocktransfer WHERE productId = ? AND routeId = ? AND deleted_at IS null`,
        [
            data.productId,
            data.routeId
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

const updateStockTransferQty = async (data, callBack) => {

    await con.query(
        `UPDATE stocktransfer SET qty= ?, updated_at= ? WHERE id = ?`,
        [
            data.qty,
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

const updateStockQty = async (data, callBack) => {

    await con.query(
        `UPDATE stocks SET qty= ?, updated_at= ? WHERE id = ?`,
        [
            data.stockQty,
            data.updated_at,
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

module.exports = {
    create,
    allStockTransfer,
    stockTransferById,
    stockTransferByRouteIdAndProductId,
    stockTransferSumByProductIdAndRouteId,
    updateStockTransferQty,
    updateStockQty,
}