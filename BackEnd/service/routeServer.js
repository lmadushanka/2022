const con = require("../config/db");

const create = async (data, callBack) => {
    await con.query(
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

const getOneRouteByid = async (id, callBack) => {
    await con.query(
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

const getOneRoute = async (data, callBack) => {
    await con.query(
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

const getAll = async (callBack) => {
    await con.query(
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

const getAllWithoutOne = async (id, callBack) => {
    await con.query(
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

const deleteById = async (id, callBack) => {
    await con.query(
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

const update = async (data, callBack) => {
    await con.query(
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