const {
    stockQtySumById,
    stockById,
    stockByProductId
} = require('../service/stockService');

const {
    create,
    allWastageStock,
    wastageStockById,
    updateQty,
    updateStockQty
} = require('../service/wastageStockService');


const addWastageStock = (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;
    body.created_at = dateTime;
    body.status = 2;

    stockQtySumById(body.product_id, (err, resultFromAvailableQty) => {


        if (
            body.product_id == '' || body.product_id == null ||
            body.qty == '' || body.qty == null || body.qty == 0
        ) {


            res.status(400).json({
                success: 0,
                msg: 'Check the input data'
            })
        } else {

            if (body.qty <= resultFromAvailableQty.qty) {

                stockByProductId(body.product_id, (err, resultsByProductWise) => {

                    let remainingWastageStock = body.qty;

                    for (i = 0; i < resultsByProductWise.length; i++) {

                        if (remainingWastageStock == resultsByProductWise[i].qty) {

                            body.stockId = resultsByProductWise[i].id;
                            body.stockQty = 0;
                            body.updated_at = dateTime;

                            updateStockQty(body, (err, resultsForUpdateStock) => {
                                if (err) {
                                    console.log(err);

                                    res.status(500).json({
                                        success: 0,
                                        msg: 'Database error by update stock!',
                                        error: err
                                    })
                                }
                            })

                            remainingWastageStock = 0;

                            i = resultsByProductWise.length;

                        } else if (remainingWastageStock < resultsByProductWise[i].qty && remainingWastageStock > 0) {


                            body.stockId = resultsByProductWise[i].id;
                            body.stockQty = resultsByProductWise[i].qty - remainingWastageStock;
                            body.updated_at = dateTime;

                            updateStockQty(body, (err, resultsForUpdateStock) => {
                                if (err) {
                                    console.log(err);

                                    res.status(500).json({
                                        success: 0,
                                        msg: 'Database error by update stock!',
                                        error: err
                                    })
                                }
                            })

                            remainingWastageStock = 0;

                            i = resultsByProductWise.length;
                        } else if (remainingWastageStock > resultsByProductWise[i].qty) {

                            body.stockId = resultsByProductWise[i].id;
                            body.stockQty = 0;
                            body.updated_at = dateTime;

                            updateStockQty(body, (err, resultsForUpdateStock) => {
                                if (err) {
                                    console.log(err);

                                    res.status(500).json({
                                        success: 0,
                                        msg: 'Database error by update stock!',
                                        error: err
                                    })
                                }


                            })

                            remainingWastageStock = remainingWastageStock - resultsByProductWise[i].qty;
                        }
                    }

                    create(body, (err, results) => {
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
                })

            } else {
                res.status(400).json({
                    success: 0,
                    msg: 'Not enough stock'
                })
            }

        }

    });





}

const getAllWastageStocks = (req, res) => {

    allWastageStock((err, results) => {
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

const getWastageStockById = (req, res) => {
    const id = req.params.id;

    wastageStockById(id, (err, results) => {

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

module.exports = {
    addWastageStock,
    getAllWastageStocks,
    getWastageStockById,
    updateQtyById
}