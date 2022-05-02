const con = require("../config/db");


//Create new stock
const create = async (data, callBack) => {
    await con.query(
        `INSERT INTO stocks(productId,routeId,stock,added_at,status)
                VALUES(?,?,?,?,?)`,
        [
            data.productId,
            data.routeId,
            data.stock,
            data.added_at,
            data.status
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        }
    )
}

//Update stock
const update = async (data, callBack) => {
    await con.query(
        `UPDATE stocks SET stock=? WHERE id=?`,
        [
            data.stock,
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

//Delete stock
const deleteOne = async (id, callBack) => {
    await con.query(
        `DELETE FROM stocks WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}


//Get stock using route id
const getOne = async (id, callBack) => {
    await con.query(
        `SELECT * FROM stocks WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

//Get stock by using route id
const stockByRouteId = async (id, callBack) => {
    await con.query(
        `SELECT * FROM stocks WHERE routeId = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

//Get stock amount groupe by product where using route id 
const stockAmountByRouteIdGroupProductWise = async (routeId, callBack) => {
    await con.query(
        `SELECT id,productId,routeId,SUM(stock) AS stock,added_at,status FROM stocks WHERE routeId = ? GROUP BY productId`,
        [routeId],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

//Get all main stock without stock amount 0
allMainStock = async callBack => {
    await con.query(
        `SELECT * FROM stocks WHERE routeId = 0 AND stock != 0 ORDER BY productId`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}


//Get stock amount all product
allProductAmountGroupByProduct = async callBack => {
    await con.query(
        `SELECT id,productId,routeId,SUM(stock) AS stock,added_at,status FROM stocks GROUP BY productId`,
        [],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}


//Get stock amount by product id and route id
//check available stock for stock transfer
const stockAmountByRouteProduct = async (data, callBack) => {
    await con.query(
        `SELECT SUM(stock) AS stock FROM stocks WHERE productId = ? AND routeId = ?`,
        [
            data.productId,
            data.routeId
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}



module.exports = {
    create,
    getOne,
    update,
    deleteOne,
    stockByRouteId,
    allMainStock,
    stockAmountByRouteIdGroupProductWise,
    allProductAmountGroupByProduct,
    stockAmountByRouteProduct
}