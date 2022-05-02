const con = require('../config/db');

const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO customer(businessName,customerName,mobileNumber,alternateNumber,landLine,
            city,routeId,address,email,creditLimit,status,added_at,added_by)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.businessName,
            data.customerName,
            data.mobileNumber,
            data.alternateNumber,
            data.landLine,
            data.city,
            data.routeId,
            data.address,
            data.email,
            data.creditLimit,
            data.status,
            data.added_at,
            data.added_by
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getAllCustomer = async callBack => {
    await con.query(
        `SELECT * FROM customer WHERE status = 1`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getWithoutOne = async (id, callBack) => {
    await con.query(
        `SELECT * FROM customer WHERE id != ? AND status = 1`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getById = async (id, callBack) => {
    await con.query(
        `SELECT * FROM customer WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0]);
        }

    )
}

const update = async (data, callBack) => {
    await con.query(
        `UPDATE customer SET businessName=?,customerName=?,mobileNumber=?,alternateNumber=?,landLine=?, city=?, 
            routeId=?, address=?, email=?, creditLimit=?, status=?  WHERE id=?`,
        [
            data.businessName,
            data.customerName,
            data.mobileNumber,
            data.alternateNumber,
            data.landLine,
            data.city,
            data.routeId,
            data.address,
            data.email,
            data.creditLimit,
            data.status,
            data.id
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results)
        }
    )
}

const deleteCustomer = async (data, callBack) => {
    await con.query(
        `UPDATE customer SET status = 0  WHERE id=?`,
        [
            data
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results)
        }
    )
}

const customerCount = async callBack => {
    await con.query(
        `SELECT COUNT(id) AS customerCount FROM customer WHERE status = 1`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results[0])
        }
    )
}

module.exports = {
    create,
    getAllCustomer,
    update,
    getWithoutOne,
    getById,
    deleteCustomer,
    customerCount
}