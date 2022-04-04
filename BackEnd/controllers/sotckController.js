const { create, getAll, getOne, update, deleteOne, getRouteIdNull, getAllStockGroupByProduct, getStockByRouteId } = require('../server/stockServer');


const createStock = (req, res) => {
    const body = req.body;

    console.log(body);

    if (body.routeId == null) {
        body.routeId = 0;
    }

    create(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}


const getAllStocksGroupByProductWise = (req, res) => {
    getAllStockGroupByProduct((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        return res.status(200).json({
            success: 1,
            data: results
        });
    })
}

const getAllStocks = (req, res) => {
    getAll((err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        return res.status(200).json({
            success: 1,
            data: results
        });
    })
}


const getStockById = (req, res) => {
    const id = req.params.id;

    getOne(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            })
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            });
        }


    });
}


const getStockByRoute = (req, res) => {
    const routeId = req.params.routeId;

    getStockByRouteId(routeId, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            })
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            });
        }


    });
}

const getMainStock = (req, res) => {
    getRouteIdNull((err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Server error'
            })
        }

        return res.status(200).json({
            success: 1,
            data: results
        });

    })
}

const updateStock = (req, res) => {
    const body = req.body;
    body.id = req.params.id;

    update(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                success: 0,
                msg: 'DB Error'
            })
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            })
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            });
        }



    });
}

const deleteStock = (req, res) => {
    const id = req.params.id;

    deleteOne(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "DB Error"
            });
        }

        if (results.affectedRows == 0) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            });
        }
    });
}

module.exports = {
    createStock,
    getAllStocksGroupByProductWise,
    getAllStocks,
    getStockById,
    updateStock,
    deleteStock,
    getMainStock,
    getStockByRoute
}