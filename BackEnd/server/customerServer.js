const con = require('../config/db');

const create = (data, callBack) => {
    con.query(
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

const getAllCustomer = callBack => {
    con.query(
        `SELECT * FROM customer`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getWithoutOne = (id, callBack) => {
    con.query(
        `SELECT * FROM customer WHERE id != ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}

const getById = (id, callBack) => {
    con.query(
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

const update = (data, callBack) => {
    con.query(
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

module.exports = {
    create,
    getAllCustomer,
    update,
    getWithoutOne,
    getById
}