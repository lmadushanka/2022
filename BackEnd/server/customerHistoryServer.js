const con = require("../config/db");

// get customer wise sales
const customerWiseAllSale = (id, callBack) => {
    con.query(
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
const customerWiseSalesCount = (id, callBack) => {
    con.query(
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
const customerWiseTotalPaid = (id, callBack) => {
    con.query(
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
const customerWiseGrandTotal = (id, callBack) => {
    con.query(
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

const customerWiseToalDiscount = (id, callBack) => {
    con.query(
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