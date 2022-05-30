const {
    stockByProductId,
    stockQtySumById
} = require('../service/stockService');

const {
    create,
    allStockTransfer,
    stockTransferById,
    stockTransferByRouteIdAndProductId,
    updateStockTransferQty,
    updateStockQty,
    stockTransferQtySumGroupByProductId
} = require('../service/stockTransferService');

const addStockTransfer = (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;
    body.created_at = dateTime;
    body.status = 2;

    stockQtySumById(body.productId, (err, resultFromAvailableQty) => {


        if (
            body.productId == '' || body.productId == null ||
            body.routeId == '' || body.routeId == null ||
            body.qty == '' || body.qty == null || body.qty == 0
        ) {

            res.status(400).json({
                success: 0,
                msg: 'Check the input data'
            })
        } else {

            if (body.qty <= resultFromAvailableQty.qty) {

                stockByProductId(body.productId, (err, resultsByProductWise) => {

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


                    body.updated_at = null;

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

const getAllStockTransfer = (req, res) => {

    allStockTransfer((err, results) => {
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
                data: results
            })
        }
    })
}


const getStockTransferById = (req, res) => {

    const id = req.params.id;

    stockTransferById(id, (err, results) => {
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
                data: results
            })
        }
    })
}

const getStockTransferByProductIdAndRouteId = (req, res) => {
    const body = req.body;

    body.productId = req.params.productId;
    body.routeId = req.params.routeId;

    stockTransferByRouteIdAndProductId(body, (err, results) => {
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
                data: results
            })
        }
    })
}

const updateStockTransfer = (req, res) => {


    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;
    body.stockTransferId = req.params.id;

    stockTransferById(body.stockTransferId, (err, resultsStockTransferById) => {

        body.productId = resultsStockTransferById.productId;
        body.id = resultsStockTransferById.id;

        if (resultsStockTransferById.qty != body.qty) {

            if (resultsStockTransferById.qty > body.qty) {

                stockByProductId(body.productId, (err, resultsByProductWise) => {

                    body.stockId = resultsByProductWise[0].id;
                    body.stockQty = resultsByProductWise[0].qty + (resultsStockTransferById.qty - body.qty);
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


                    // body.updated_at = null;

                    updateStockTransferQty(body, (err, results) => {

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
                                data: results
                            })

                        }
                    })

                })

            } else {


                //////////////////////////////

                stockByProductId(body.productId, (err, resultsByProductWise) => {

                    let remainingWastageStock = (body.qty - resultsStockTransferById.qty);

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



                    updateStockTransferQty(body, (err, results) => {

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
                                data: results
                            })

                        }
                    })
                })

                /////////////////////////////
            }

        } else {
            res.status(400).json({
                success: 0,
                msg: 'Nothing to change!'
            })
        }
    })
}

const getStockTransferQtySumGroupByProductId = (req, res) => {
    const id = req.params.routeId;

    stockTransferQtySumGroupByProductId(id, (err, results) => {
        if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error' });

        if (!results) res.status(404).json({ success: 0, msg: 'Records not found' });
        else
            res.status(200).json({ success: 1, data: results });
    })
}


module.exports = {
    addStockTransfer,
    getAllStockTransfer,
    getStockTransferById,
    getStockTransferByProductIdAndRouteId,
    updateStockTransfer,
    getStockTransferQtySumGroupByProductId
}