
// Stock service
const {
    stockByProductId,
} = require('../service/stockService');

// Stock transfer service
const {
    stockTransferByRouteIdAndProductId,
    stockTransferSumByProductIdAndRouteId,
    updateStockTransferQty,
    updateStockQty,
} = require('../service/stockTransferService');

// Stock return service
const {
    create,
    stockReturnById,
    updateStatus
} = require('../service/stockReturnService');


let stockTransferObj = {
    qty: 0,
    updated_at: null,
    id: null
}

let stockObj = {
    stockQty: 0,
    updated_at: null,
    stockId: null
}

createStockReturn = (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    const body = req.body;
    body.status = 2;
    body.created_at = dateTime;


    create(body, (err, results) => {
        if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });


        res.status(200).json({ success: 1, data: results });


    })


}

const setUpdateStatus = (req, res) => {

    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

    let stockReturnObj = {
        id: req.params.id,
        status: 1,
        updated_at: dateTime,
        productId: null,
        routeId: null,
        returnQty: null,
        reason: null,
        note: null
    }

    if (stockReturnObj.status == 1) {

        stockReturnById(stockReturnObj.id, (err, resultsOfStockReturn) => {
            if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });

            stockReturnObj.productId = resultsOfStockReturn.productId;
            stockReturnObj.routeId = resultsOfStockReturn.routeId;
            stockReturnObj.returnQty = resultsOfStockReturn.qty;
            stockReturnObj.reason = resultsOfStockReturn.reason;
            stockReturnObj.note = resultsOfStockReturn.note;

            stockTransferSumByProductIdAndRouteId(stockReturnObj, (err, resultsOfTotalQtyByStockTransfer) => {

                if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });

                if (resultsOfTotalQtyByStockTransfer.totalQty >= stockReturnObj.returnQty) {

                    stockTransferByRouteIdAndProductId(stockReturnObj, (err, resultsOfStockTransfer) => {

                        if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });

                        let remainingStock = stockReturnObj.returnQty;

                        for (i = 0; i < resultsOfStockTransfer.length; i++) {
                            if (remainingStock == resultsOfStockTransfer[i].qty) {

                                stockTransferObj.id = resultsOfStockTransfer[i].id;
                                stockTransferObj.qty = 0;
                                stockTransferObj.updated_at = dateTime;

                                updateStockTransferQty(stockTransferObj, (err, resultsOfUpdateStockTransfer) => {
                                    if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });
                                })

                                remainingStock = 0;

                                i = resultsOfStockTransfer.length;

                            } else if (remainingStock > resultsOfStockTransfer[i].qty) {

                                stockTransferObj.id = resultsOfStockTransfer[i].id;
                                stockTransferObj.qty = 0;
                                stockTransferObj.updated_at = dateTime;

                                updateStockTransferQty(stockTransferObj, (err, resultsOfUpdateStockTransfer) => {
                                    if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });
                                })

                                remainingStock = remainingStock - resultsOfStockTransfer[i].qty;
                            } else if (remainingStock < resultsOfStockTransfer[i].qty) {

                                stockTransferObj.id = resultsOfStockTransfer[i].id;
                                stockTransferObj.qty = resultsOfStockTransfer[i].qty - remainingStock;
                                stockTransferObj.updated_at = dateTime;

                                updateStockTransferQty(stockTransferObj, (err, resultsOfUpdateStockTransfer) => {
                                    if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });
                                })

                                remainingStock = 0;

                                i = resultsOfStockTransfer.length;
                            }
                        }
                    })

                    stockByProductId(stockReturnObj.productId, (err, resultOfStockByProductId) => {

                        if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });

                        stockObj.stockQty = resultOfStockByProductId[0].qty + stockReturnObj.returnQty;
                        stockObj.stockId = resultOfStockByProductId[0].id;
                        stockObj.updated_at = dateTime;

                        updateStockQty(stockObj, (err, resultsOfStockUpdate) => {

                            if (err) console.log(err), res.status(500).json({ success: 0, msg: 'Database error!' });

                        })
                    })


                } else {
                    res.status(400).json({
                        success: 0,
                        msg: 'Not enough stock for return'
                    })

                }
            })

            updateStatus(stockReturnObj, (err, results) => {
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
                        msg: 'Record not found'
                    })
                } else {
                    res.status(200).json({
                        success: 1,
                        data: results
                    })
                }
            })
        })



    }



}

module.exports = {
    createStockReturn,
    setUpdateStatus
}