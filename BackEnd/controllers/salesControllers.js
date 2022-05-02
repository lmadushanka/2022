const {
    create,
    getRouteId,
    createProductSales,
    getOneSale,
    getAllSale,
    getProductSaleBySaleId,
    getStockByRouteAndProductId,
    updateStock,
    update,
    updateProductSale,
    freeIssue,
    filterSalesByPaymentStatus,
    filterSalesBySalesStatus,
    filterAllStatus
} = require('../service/salesServer');

const addSale = (req, res) => {
    const body = req.body

    console.log(body);


    if (body.customerId != "" && body.userId != "" && body.productSale.length > 0) {
        getRouteId(body.customerId, (err, results) => {
            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: 0,
                    msg: 'Database eroor'
                });
            }

            body.routeId = results.routeId;

            create(body, (err, results2) => {
                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        success: 0,
                        msg: 'Database eroor'
                    })
                }

                for (let i = 0; i < body.productSale.length; i++) {

                    body.productSale[i].saleId = results2.insertId;

                    body.productSale[i].routeId = body.routeId;


                    createProductSales(body.productSale[i], (err, results3) => {
                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                success: 0,
                                msg: 'Database eroor'
                            })
                        }

                    });


                    getStockByRouteAndProductId(body.productSale[i], (err, results4) => {
                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                success: 0,
                                msg: 'Database eroor'
                            })
                        }

                        for (j = 0; j < results4.length; j++) {

                            if (results4[j].stock > body.productSale[i].qty) {
                                const remainingStock = results4[j].stock - (body.productSale[i].qty + body.productSale[i].freeIssue);

                                body.stockId = results4[j].id;
                                body.remainingStock = remainingStock;

                                updateStock(body, (err, results5) => {


                                    if (err) {
                                        console.log(err);
                                        return res.status(500).json({
                                            success: 0,
                                            msg: 'Database eroor'
                                        })
                                    }
                                })

                                j = results4.length;
                            }
                        }


                    });


                }

                if (results || results2) {
                    res.status(200).json({
                        success: 1,
                        data: results2
                    })
                }
            });
        })
    } else {
        return res.status(400).json({
            success: 0,
            msg: 'Validation error'
        })
    }


}

const updateSales = (req, res) => {
    const body = req.body;
    body.id = req.params.id;

    if (
        body.customerId != "" || body.userId != "" || body.paymentStatus != "" || body.salesSatatus != ""
        || body.totalQty != "", body.totalPrice != "" || body.grandTotal != "" || body.paidAmount != ""
        || body.productSale.length > 0
    ) {
        getOneSale(body.id, (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: 0,
                    msg: 'Database eroor'
                })
            }


            if (results) {

                for (k = 0; k < body.productSale.length; k++) {
                    body.productSale[k].routeId = results.routeId;
                }

                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        msg: "Record not found"
                    })
                } else {


                    if (results.totalQty != body.totalQty) {
                        getProductSaleBySaleId(body.id, (err, resultInProductSale) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({
                                    success: 0,
                                    msg: "Database error"
                                })
                            }


                            for (i = 0; i < resultInProductSale.length; i++) {

                                for (j = 0; j < body.productSale.length; j++) {

                                    if (resultInProductSale[i].product_id == body.productSale[j].product_id) {
                                        //QTY Decreased
                                        if (
                                            resultInProductSale[i].qty > body.productSale[j].qty ||
                                            resultInProductSale[i].freeIssue > body.productSale[j].freeIssue
                                        ) {
                                            const qtyDef = resultInProductSale[i].qty - body.productSale[j].qty;

                                            const freeDef = resultInProductSale[i].freeIssue - body.productSale[j].freeIssue

                                            const stockDefferent = qtyDef + freeDef;

                                            if (stockDefferent > 0) {


                                                body.productSale[j].productSaleId = resultInProductSale[i].id;

                                                console.log(body);

                                                getStockByRouteAndProductId(body.productSale[j], (err, resultsStock) => {
                                                    if (err) {
                                                        console.log(err);

                                                        return res.status(500).json({
                                                            success: 0,
                                                            msg: 'Database error'
                                                        })
                                                    }

                                                    for (l = 0; l < resultsStock.length; l++) {
                                                        if (resultsStock[l].stock > stockDefferent) {
                                                            const remainingStock = resultsStock[l].stock + stockDefferent;

                                                            body.remainingStock = remainingStock;
                                                            body.stockId = resultsStock[l].id;

                                                            updateStock(body, (err, resultsInUpdateStock) => {
                                                                if (err) {
                                                                    console.log(err);

                                                                    return res.status(500).json({
                                                                        success: 0,
                                                                        msg: 'Databse error'
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                });


                                            }


                                            updateProductSale(body.productSale[j], (err, resultsUpdateProductSale) => {
                                                if (err) {
                                                    console.log(err);

                                                    return res.status(500).json({
                                                        success: 0,
                                                        msg: "Database error"
                                                    })
                                                }
                                            });
                                        }
                                        //QTY Increased
                                        else if (
                                            resultInProductSale[i].qty < body.productSale[j].qty ||
                                            resultInProductSale[i].freeIssue < body.productSale[j].freeIssue
                                        ) {

                                            const qtyDef = body.productSale[j].qty - resultInProductSale[i].qty;

                                            const freeDef = body.productSale[j].freeIssue - resultInProductSale[i].freeIssue

                                            const stockDefferent = qtyDef + freeDef;

                                            if (stockDefferent > 0) {


                                                body.productSale[j].productSaleId = resultInProductSale[i].id;

                                                console.log(body);

                                                getStockByRouteAndProductId(body.productSale[j], (err, resultsStock) => {
                                                    if (err) {
                                                        console.log(err);

                                                        return res.status(500).json({
                                                            success: 0,
                                                            msg: 'Database error'
                                                        })
                                                    }

                                                    for (l = 0; l < resultsStock.length; l++) {
                                                        if (resultsStock[l].stock > stockDefferent) {
                                                            const remainingStock = resultsStock[l].stock - stockDefferent;

                                                            body.remainingStock = remainingStock;
                                                            body.stockId = resultsStock[l].id;

                                                            updateStock(body, (err, resultsInUpdateStock) => {
                                                                if (err) {
                                                                    console.log(err);

                                                                    return res.status(500).json({
                                                                        success: 0,
                                                                        msg: 'Databse error'
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                });


                                            }


                                            updateProductSale(body.productSale[j], (err, resultsUpdateProductSale) => {
                                                if (err) {
                                                    console.log(err);

                                                    return res.status(500).json({
                                                        success: 0,
                                                        msg: "Database error"
                                                    })
                                                }

                                                console.log(resultsUpdateProductSale);
                                            });


                                        }
                                    }




                                }
                            }

                            update(body, (err, resultsInUpdate) => {
                                if (err) {
                                    console.log(err);

                                    return res.status(500).json({
                                        success: 0,
                                        msg: 'Database error'
                                    })
                                }

                                return res.status(200).json({
                                    success: 1,
                                    msg: resultsInUpdate.message
                                })
                            })
                        })
                    } else {
                        update(body, (err, resultsInUpdate) => {
                            if (err) {
                                console.log(err);

                                return res.status(500).json({
                                    success: 0,
                                    msg: 'Database error'
                                })
                            }

                            return res.status(200).json({
                                success: 1,
                                msg: resultsInUpdate.message
                            })
                        })
                    }




                }
            } else {
                return res.status(404).json({
                    success: 0,
                    msg: 'Record not found'
                })
            }



        })
    } else {
        return res.status(400).json({
            success: 0,
            msg: 'Validation error'
        })
    }

}

const getSaleById = (req, res) => {

    const saleId = req.params.saleId;

    getOneSale(saleId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: 'Database eroor'
            })
        }

        if (results) {
            return res.status(200).json({
                success: 1,
                data: results
            })
        } else {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            })
        }
    })
}

const getSales = (req, res) => {

    getAllSale((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: 'Database eroor'
            })
        }

        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

const getFreeIssue = (req, res) => {
    const saleId = req.params.saleId;

    freeIssue(saleId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: 'Database eroor'
            })
        }

        if (results) {
            return res.status(200).json({
                success: 1,
                data: results
            })
        } else {
            return res.status(404).json({
                success: 0,
                data: 'Record not found'
            })
        }
    })
}

// Get product sales by sale id
const getProductSale = (req, res) => {
    const saleId = req.params.saleId;

    getProductSaleBySaleId(saleId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: 'Database eroor'
            })
        }

        if (results) {
            return res.status(200).json({
                success: 1,
                data: results
            })
        } else {
            return res.status(404).json({
                success: 0,
                data: 'Record not found'
            })
        }
    });
}

const filterSalesById = (req, res) => {
    const body = req.body;

    body.paymentStatus = req.params.paymentStatus;
    body.salesStataus = req.params.salesStatus;

    if (body.paymentStatus != 'undefined' || body.salesStataus == 'undefined') {

        filterSalesByPaymentStatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    msg: 'Database eroor'
                })
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            } else {
                return res.status(404).json({
                    success: 0,
                    data: 'Record not found'
                })
            }
        })
    } else if (body.paymentStatus == 'undefined' || body.salesStataus != 'undefined') {

        filterSalesBySalesStatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    msg: 'Database eroor'
                })
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            } else {
                return res.status(404).json({
                    success: 0,
                    data: 'Record not found'
                })
            }
        })
    } else if (body.paymentStatus != 'undefined' || body.salesStataus != 'undefined') {

        filterAllStatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    msg: 'Database eroor'
                })
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            } else {
                return res.status(404).json({
                    success: 0,
                    data: 'Record not found'
                })
            }
        })
    }



}

module.exports = {
    addSale,
    getSales,
    getProductSale,
    getSaleById,
    updateSales,
    getFreeIssue,
    filterSalesById
}