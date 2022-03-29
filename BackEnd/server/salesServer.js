const con = require('../config/db');


// Insert sales to sales table
const create = (data, callBack) => {
    con.query(
        `INSERT INTO sales(customerId, userId, routeId, paymentStatus, salesSatatus,
            totalQty, totalPrice, totalDiscount, grandTotal, paidAmount, salesNote, createdAt)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.customerId,
            data.userId,
            data.routeId,
            data.paymentStatus,
            data.salesSatatus,
            data.totalQty,
            data.totalPrice,
            data.totalDiscount,
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
const createProductSales = (data, callBack) => {
    con.query(
        `INSERT INTO productssale(saleId, product_id, qty, freeIssue, unitPrice, discount,total)
                VALUES(?,?,?,?,?,?,?)`,
        [
            data.saleId,
            data.product_id,
            data.qty,
            data.freeIssue,
            data.unitPrice,
            data.discount,
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
const getRouteId = (customerId, callBack) => {
    con.query(
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
const getAllSale = callBack => {
    con.query(
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
const getOneSale = (id, callBack) => {
    con.query(
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

//Get product sales by saleId
getProductSaleBySaleId = (saleId, callBack) => {
    con.query(
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
const updateStock = (data, callBack) => {
    con.query(
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
getStockByRouteAndProductId = (data, callBack) => {
    con.query(
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
const update = (data, callBack) => {
    con.query(
        `UPDATE sales SET paymentStatus =?, salesSatatus=?, totalQty=?, totalPrice=?,totalDiscount=?,
                grandTotal=?,paidAmount=?, salesNote=?  WHERE id=?`,
        [
            data.paymentStatus,
            data.salesSatatus,
            data.totalQty,
            data.totalPrice,
            data.totalDiscount,
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

const updateProductSale = (data, callBack) => {
    con.query(
        `UPDATE productssale SET qty =?, freeIssue=?, discount=?, total=?  WHERE id=?`,
        [
            data.qty,
            data.freeIssue,
            data.discount,
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
    updateProductSale
}