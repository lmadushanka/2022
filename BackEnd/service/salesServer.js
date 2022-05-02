const con = require('../config/db');


// Insert sales to sales table
const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO sales(customerId, userId, routeId, paymentStatus,Account,chequeNumber, salesSatatus,
            totalQty, totalPrice, grandTotal, paidAmount, salesNote, createdAt)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.customerId,
            data.userId,
            data.routeId,
            data.paymentStatus,
            data.account,
            data.chequeNumber,
            data.salesSatatus,
            data.totalQty,
            data.totalPrice,
            data.grandTotal,
            data.paidAmount,
            data.salesNote,
            data.createdAt
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

//Insert product sales to productSales
const createProductSales = async (data, callBack) => {
    await con.query(
        `INSERT INTO productssale(saleId, product_id, qty, freeIssue, unitPrice,total)
                VALUES(?,?,?,?,?,?)`,
        [
            data.saleId,
            data.product_id,
            data.qty,
            data.freeIssue,
            data.unitPrice,
            data.total
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

//Get routeId
const getRouteId = async (customerId, callBack) => {
    await con.query(
        `SELECT routeId FROM customer WHERE id = ?`,
        [customerId],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results[0])
        }
    )
}


//Get all Sales
const getAllSale = async callBack => {
    await con.query(
        `SELECt * FROM sales`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }

            return callBack(null, results)
        }
    )
}


//Get sale by id
const getOneSale = async (id, callBack) => {
    await con.query(
        `SELECT * FROM sales WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results[0])
        }
    )
}

const freeIssue = async (saleId, callBack) => {
    await con.query(
        `SELECT SUM(freeIssue) AS freeIssue FROM productssale WHERE saleId = ?`,
        [saleId],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}


//Get product sales by saleId
const getProductSaleBySaleId = async (saleId, callBack) => {
    await con.query(
        `SELECT * FROM productssale WHERE saleId = ?`,
        [saleId],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }

            return callBack(null, results);
        }
    )
}


//Update stock
const updateStock = async (data, callBack) => {
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

//Get stock by routeId and productId
getStockByRouteAndProductId = async (data, callBack) => {
    await con.query(
        `SELECT * FROM stocks WHERE productId = ? AND routeId = ? ORDER BY added_at ASC`,
        [
            data.product_id,
            data.routeId,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        }
    )
}

//Update sales
const update = async (data, callBack) => {
    await con.query(
        `UPDATE sales SET paymentStatus =?, salesSatatus=?, totalQty=?, totalPrice=?,
                grandTotal=?,paidAmount=?, salesNote=?  WHERE id=?`,
        [
            data.paymentStatus,
            data.salesSatatus,
            data.totalQty,
            data.totalPrice,
            data.grandTotal,
            data.paidAmount,
            data.salesNote,
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

const updateProductSale = async (data, callBack) => {
    await con.query(
        `UPDATE productssale SET qty =?, freeIssue=?, total=?  WHERE id=?`,
        [
            data.qty,
            data.freeIssue,
            data.total,
            data.productSaleId
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

const filterSalesByPaymentStatus = async (data, callBack) => {
    await con.query(
        `SELECT * FROM sales WHERE paymentStatus = ? ORDER BY createdAt ASC`,
        [
            data.paymentStatus
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        }
    )
}

const filterSalesBySalesStatus = async (data, callBack) => {
    await con.query(
        `SELECT * FROM sales WHERE salesSatatus = ? ORDER BY createdAt ASC`,
        [
            data.salesStataus,
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        }
    )
}

const filterAllStatus = async (data, callBack) => {
    await con.query(
        `SELECT * FROM sales WHERE paymentStatus = ? AND salesSatatus = ? ORDER BY createdAt ASC`,
        [
            data.paymentStatus,
            data.salesStataus,
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
    getRouteId,
    createProductSales,
    getAllSale,
    getOneSale,
    getProductSaleBySaleId,
    updateStock,
    getStockByRouteAndProductId,
    update,
    updateProductSale,
    freeIssue,
    filterSalesByPaymentStatus,
    filterSalesBySalesStatus,
    filterAllStatus
}