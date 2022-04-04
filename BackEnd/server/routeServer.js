const con = require("../config/db");

const create = (data, callBack) => {
    con.query(
        `INSERT INTO routes(routeNumber, routeName,cities)
                VALUES(?,?,?)`,
        [
            data.routeNumber,
            data.routeName,
            data.cities
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        }
    )
}

const getOneRouteByid = (id, callBack) => {
    con.query(
        `SELECT * FROM routes WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const getOneRoute = (data, callBack) => {
    con.query(
        `SELECT * FROM routes WHERE routeNumber = ? OR routeName = ?`,
        [
            data.routeNumber,
            data.routeName
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    )
}

const getAll = (callBack) => {
    con.query(
        `SELECt * FROM routes`,
        [],
        (err, result, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, result);
        }
    )
}

const getAllWithoutOne = (id, callBack) => {
    con.query(
        `SELECt * FROM routes WHERE id != ?`,
        [id],
        (err, result, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, result);
        }
    )
}

const deleteById = (id, callBack) => {
    con.query(
        `DELETE FROM routes WHERE id = ?`,
        [id],
        (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    )
}

const update = (data, callBack) => {
    con.query(
        `UPDATE routes SET routeNumber=?, routeName=?,cities=? WHERE id=?`,
        [
            data.routeNumber,
            data.routeName,
            data.cities,
            data.id
        ],
        (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        }
    )
}

module.exports = {
    create,
    getOneRoute,
    getAll,
    deleteById,
    update,
    getAllWithoutOne,
    getOneRouteByid
}