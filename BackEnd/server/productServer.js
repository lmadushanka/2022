const con = require("../config/db");

const create = (data, callBack) => {
    con.query(
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

const getOne = (id, callBack) => {
    con.query(
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

const checkDuplicated = (data, callBack) => {
    con.query(
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

const getAll = callBack => {
    con.query(
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

const update = (data, callBack) => {
    con.query(
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

const deleteOne = (id, callBack) => {
    con.query(
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