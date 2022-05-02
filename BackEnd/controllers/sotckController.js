const {
    create,
    getOne,
    update,
    deleteOne,
    stockAmountByRouteIdGroupProductWise,
    allMainStock,
    allProductAmountGroupByProduct,
    stockAmountByRouteProduct,
} = require('../service/stockServer');


// Create new stock (main stock)
const createStock = (req, res) => {
    const body = req.body;

    if (body.routeId == null) {
        body.routeId = 0;
    }

    // Add new main stock query
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

//Get all main stock
const getAllMainStock = (req, res) => {

    // Get all main stock without stock amount 0 query
    allMainStock((err, results) => {
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

    stockAmountByRouteIdGroupProductWise(routeId, (err, results) => {
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

//Get stock amount by provide route and product
const getStockAmountByRouteProduct = async (req, res) => {
    const body = req.body;

    stockAmountByRouteProduct(body, (err, results) => {

        if (err) {

            console.log(err);
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

const getSumAllProductWise = (req, res) => {
    allProductAmountGroupByProduct((err, results) => {
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

module.exports = {
    createStock,
    getAllMainStock,
    getStockById,
    updateStock,
    deleteStock,
    getStockByRoute,
    getSumAllProductWise,
    getStockAmountByRouteProduct
}