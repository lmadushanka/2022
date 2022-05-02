const con = require("../config/db");

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO products(productCode,productName,productDescription,cost,sale,unit,status)
                        VALUES(?,?,?,?,?,?,?)`,
        [
            data.productCode,
            data.productName,
            data.productDescription,
            data.cost,
            data.sale,
            data.unit,
            data.status,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        }
    )

}

const getOne = async (id, callBack) => {
    await con.query(
        `SELECT * FROM products WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const checkDuplicated = async (data, callBack) => {
    await con.query(
        `SELECT * FROM products WHERE productCode = ?`,
        [data.productCode],
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
        `SELECT * FROM products`,
        [],
        (err, result, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, result);
        }
    )
}

const update = async (data, callBack) => {
    await con.query(
        `UPDATE products SET productCode=?, productName=?, productDescription=?, cost=?, sale=?, unit=?, status=? WHERE id=? `,
        [
            data.productCode,
            data.productName,
            data.productDescription,
            data.cost,
            data.sale,
            data.unit,
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

const deleteOne = async (id, callBack) => {
    await con.query(
        `DELETE FROM products WHERE id=?`,
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
    checkDuplicated
}