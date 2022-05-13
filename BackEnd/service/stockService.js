const con = require('../config/db');

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO stocks(product_id,qty,recieved,status,created_at,
            updated_at,deleted_at)
                VALUES(?,?,?,?,?,?,?)`,
        [
            data.product_id,
            data.qty,
            data.recieved,
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

const allStock = async callBack => {
    await con.query(
        'SELECT * FROM stocks WHERE deleted_at IS  NULL',
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const stockById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM stocks WHERE id = ? AND deleted_at IS NULL`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

const stockByProductId = async (productId, callBack) => {
    await con.query(
        `SELECT * FROM stocks WHERE product_id = ? AND deleted_at IS NULL`,
        [productId],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

//Stock qty sum
const stockQtySumById = async (id, callBack) => {
    await con.query(
        `SELECT SUM(qty) AS qty FROM stocks WHERE deleted_at IS NULL AND status = 1 AND product_id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }
    )
}

//Update only stock qty
const updateQty = async (data, callBack) => {
    await con.query(
        `UPDATE stocks SET qty= ?, updated_at= ? WHERE id = ?`,
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

const updateRecieved = async (data, callBack) => {
    await con.query(
        `UPDATE stocks SET recieved= ?, status = ?, updated_at= ? WHERE id = ?`,
        [
            data.recieved,
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

const rejectStock = async (data, callBack) => {
    await con.query(
        `UPDATE stocks SET status = ?, updated_at= ? WHERE id = ?`,
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


const deleteById = async (data, callBack) => {
    await con.query(
        `UPDATE stocks SET deleted_at= ? WHERE id = ?`,
        [
            data.deleted_at,
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


const stockAmountGroupByProductId = async callBack => {

    await con.query(
        `SELECT product_id, qty FROM stocks WHERE deleted_at IS NULL GROUP BY product_id`,
        [],
        (err, results, fields) => {
            if (err) return callBack(err);

            return callBack(null, results);
        }
    )
}


module.exports = {
    create,
    allStock,
    stockById,
    stockByProductId,
    stockQtySumById,
    updateQty,
    updateRecieved,
    rejectStock,
    deleteById,
    stockAmountGroupByProductId
}