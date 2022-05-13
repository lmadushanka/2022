const {
    create,
    allStock,
    stockById,
    stockByProductId,
    stockQtySumById,
    updateQty,
    updateRecieved,
    rejectStock,
    deleteById,
    stockAmountGroupByProductId
} = require('../service/stockService');


const createStock = async (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;

    body.recieved = null;
    body.status = 2;
    body.updated_at = null;
    body.created_at = dateTime;
    body.deleted_at = null;


    if (
        body.product_id == "" || body.product_id == null ||
        body.qty == "" || body.qty == null || body.qty == 0
    ) {
        res.status(404).json({
            success: 0,
            msg: 'Check the input data!'
        })
    } else {
        await create(body, (err, results) => {
            if (err) {
                console.log(err);

                res.status(500).json({
                    success: 0,
                    msg: 'Databse error!',
                    error: err
                })
            }

            res.status(200).json({
                success: 1,
                data: results
            })
        })
    }


}

const getAllStocks = (req, res) => {

    allStock((err, results) => {
        if (err) {
            console.log(err);

            res.status(500).json({
                success: 0,
                msg: 'Database error!',
                error: err
            })
        }

        res.status(200).json({
            success: 1,
            data: results
        })
    })
}

const getStockById = (req, res) => {
    const id = req.params.id;

    stockById(id, (err, results) => {

        if (id == '' || id == null) {
            res.status(400).json({
                success: 0,
                msg: 'Check the dtock id'
            })
        } else {
            if (err) {
                console.log(err);

                res.status(500).json({
                    success: 0,
                    msg: 'Databse error!',
                    error: err
                })
            }

            if (!results) {
                res.status(404).json({
                    success: 0,
                    msg: 'Records not found!',
                });
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        }

    })
}


//Get stock by product id
const getStockByProductId = (req, res) => {
    const productId = req.params.productId;

    stockByProductId(productId, (err, results) => {

        if (productId == '' || productId == null) {
            res.status(400).json({
                success: 0,
                msg: 'Check the dtock id'
            })
        } else {
            if (err) {
                console.log(err);

                res.status(500).json({
                    success: 0,
                    msg: 'Databse error!',
                    error: err
                })
            }

            if (!results) {
                res.status(404).json({
                    success: 0,
                    msg: 'Records not found!',
                });
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        }

    })
}

// Get stock qty sum as approved
const getStockQtySumById = (req, res) => {

    const id = req.params.id;

    stockQtySumById(id, (err, results) => {
        if (err) {
            console.log(err);

            res.status(500).json({
                success: 0,
                msg: 'Databse error!',
                error: err
            })
        }

        if (!results) {
            res.status(404).json({
                success: 0,
                msg: 'Records not found!',
            });
        } else {
            res.status(200).json({
                success: 1,
                data: results
            })
        }
    });
}

//Update only qty
const updateQtyById = (req, res) => {
    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });
    const body = req.body;

    body.id = req.params.id;
    body.updated_at = dateTime;

    if (body.qty == "" || body.qty == 0) {
        res.status(400).json({
            success: 0,
            msg: 'Check the input qty',
        })
    } else {

        updateQty(body, (err, results) => {
            if (err) {
                console.log(err);

                res.status(500).json({
                    success: 0,
                    msg: 'Database error',
                    error: err
                })
            }

            if (!results) {
                res.status(404).json({
                    success: 0,
                    msg: 'Records not found'
                })
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        })


    }
}


//Update only recieved
const updateRecievedById = (req, res) => {
    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });
    const body = req.body;

    body.id = req.params.id;
    body.updated_at = dateTime;
    body.status = 1;

    if (body.recieved == "") {
        res.status(400).json({
            success: 0,
            msg: 'Check the input revieved data'
        })
    } else {

        updateRecieved(body, (err, results) => {
            if (err) {
                console.log(err);

                res.status(500).json({
                    success: 0,
                    msg: 'Database error',
                    error: err
                })
            }

            if (!results) {
                res.status(404).json({
                    success: 0,
                    msg: 'Records not found'
                })
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                })
            }

        })
    }
}

getStockAmountGroupByProductId = (req, res) => {

    stockAmountGroupByProductId((err, results) => {
        if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error' });

        res.status(200).json({ success: 1, data: results });
    })
}

const setRejectStock = (req, res) => {
    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });
    const body = req.body;
    body.id = req.params.id;
    body.status = 3;
    body.updated_at = dateTime;

    rejectStock(body, (err, results) => {
        if (err) {
            console.log(err);

            res.status(500).json({
                success: 0,
                msg: 'Database error!'
            })
        }

        if (!results) {
            res.status(404).json({
                success: 0,
                msg: 'Record not found!'
            })
        } else {
            res.status(200).json({
                success: 1,
                data: results,
            })
        }

    })
}

const deleteStock = async (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;

    body.id = req.params.id;
    body.deleted_at = dateTime;

    deleteById(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Databse error"
            });
        }

        if (!results) {
            return res.status(500).json({
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
    getAllStocks,
    getStockById,
    getStockByProductId,
    getStockQtySumById,
    updateQtyById,
    updateRecievedById,
    setRejectStock,
    deleteStock,
    getStockAmountGroupByProductId
}