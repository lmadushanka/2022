const con = require("../config/db");

// get customer wise sales
const customerWiseAllSale = async (id, callBack) => {
    await con.query(
        `SELECT * FROM sales WHERE customerId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

// get sale count by customer
const customerWiseSalesCount = async (id, callBack) => {
    await con.query(
        `SELECT COUNT(id) AS count FROM sales WHERE customerId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}


// get customer wise total paid amount sum
const customerWiseTotalPaid = async (id, callBack) => {
    await con.query(
        `SELECT SUM(paidAmount) AS totalPaidAmount FROM sales WHERE customerId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}


// get customer wise grand total sum
const customerWiseGrandTotal = async (id, callBack) => {
    await con.query(
        `SELECT SUM(grandTotal) AS grandTotal FROM sales WHERE customerId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const customerWiseToalDiscount = async (id, callBack) => {
    await con.query(
        `SELECT SUM(totalDiscount) AS totalDiscount FROM sales WHERE customerId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

module.exports = {
    customerWiseAllSale,
    customerWiseTotalPaid,
    customerWiseGrandTotal,
    customerWiseToalDiscount,
    customerWiseSalesCount
}