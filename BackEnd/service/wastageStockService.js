const con = require('../config/db');

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO wastage_stock(product_id,qty,reason,note,status,created_at,
            updated_at,deleted_at)
                VALUES(?,?,?,?,?,?,?,?)`,
        [
            data.product_id,
            data.qty,
            data.reason,
            data.note,
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

allWastageStock = async callBack => {
    await con.query(
        'SELECT * FROM wastage_stock WHERE deleted_at IS  NULL',
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )

}

const wastageStockById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM wastage_stock WHERE id = ? AND deleted_at IS NULL`,
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
        `UPDATE wastage_stock SET qty= ?, updated_at= ? WHERE id = ?`,
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
    allWastageStock,
    wastageStockById,
    updateQty,
    updateStockQty
}