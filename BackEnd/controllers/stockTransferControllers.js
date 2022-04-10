const {
    create,
    getOneById,
    getAll,
    update,
    getAllStocksByProductIdOrderByASC,
    getAllStocksByProductIdOrderByASCWith0Stock,
    getStocksCountByProductId,
    updateStockCount,
    getStockAmountByRoute,
    createStock,
} = require("../server/stockTransferServer");


// Create stock transfer
const createStockTransfer = (req, res) => {
    const body = req.body;
    //  Get main stock count by product id
    getStocksCountByProductId(body.productId, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: err
            })
        }

        if (!results) {
            return res.status(400).json({
                success: 0,
                msg: 'Record not found'
            })
        } else {

            if (results.stockAmount > body.stock) {
                //Get stock list by product id
                getAllStocksByProductIdOrderByASC(body.productId, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            msg: err
                        })
                    }

                    if (!results) {
                        return res.status(400).json({
                            success: 0,
                            msg: "Record not found"
                        });
                    } else {

                        let remainingStock = body.stock

                        for (i = 0; i < results.length; i++) {

                            if (results[i].stock <= remainingStock) {
                                remainingStock = remainingStock - results[i].stock;

                                body.stockId = results[i].id;

                                if (remainingStock > 0) {
                                    body.remainingStock = 0;
                                } else {
                                    body.remainingStock = remainingStock;
                                }



                                updateStockCount(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: 'Database error'
                                        })
                                    }
                                });

                                if (remainingStock == 0) {
                                    i = res.length
                                }

                            } else if (results[i].stock > remainingStock) {

                                remainingStock = results[i].stock - remainingStock;

                                body.stockId = results[i].id;

                                body.remainingStock = remainingStock;

                                updateStockCount(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: err
                                        })
                                    }
                                });

                                i = res.length
                            }

                        }

                        body.added_at = body.date

                        create(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: err
                                })
                            }

                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        });

                        createStock(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: 'Server error'
                                })
                            }
                        });

                    }
                });
            } else {
                return res.status(400).json({
                    success: 0,
                    msg: 'Not enough stock'
                })
            }

        }
    })


}


// Update stock transfer
const updateStockTransfer = (req, res) => {

    const body = req.body;
    body.id = req.params.id;

    // Check record availability
    getOneById(body.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: err
            });
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            })
        } else {
            // Check whether there is a decrease or increase

            //Same
            if (body.stock == results.stock) {

                return res.status(400).json({
                    success: 0,
                    msg: 'Nothing to change'
                })

            }
            //Increase
            else if (body.stock > results.stock) {

                getAllStocksByProductIdOrderByASC(results.productId, (err, results2) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            msg: err
                        })
                    }

                    // Check stock availability
                    if (!results2) {
                        return res.status(404).json({
                            success: 0,
                            msg: 'Not enough stock'
                        })
                    } else {
                        let stockDefferent = body.stock - results.stock;

                        for (i = 0; i < results2.length; i++) {

                            if (results2[i].stock == stockDefferent) {

                                const remainingStock = 0;

                                body.stockId = results2[i].id;

                                body.remainingStock = remainingStock;

                                updateStockCount(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: err
                                        })
                                    }
                                });

                                i = res.length

                            } else if (results2[i].stock > stockDefferent) {

                                const remainingStock = results2[i].stock - stockDefferent;

                                body.stockId = results2[i].id;

                                body.remainingStock = remainingStock;

                                updateStockCount(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: err
                                        })
                                    }
                                });

                                i = res.length

                            } else if (results2[i].stock < stockDefferent) {

                                stockDefferent = stockDefferent - results2[i].stock;

                                body.stockId = results2[i].id;

                                body.remainingStock = 0;

                                updateStockCount(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: err
                                        })
                                    }
                                });
                            }

                        }

                        update(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: err
                                })
                            }

                            return res.status(200).json({
                                success: 1,
                                msg: results
                            })

                        })
                    }
                });

            }
            //Decrease
            else if (body.stock < results.stock) {

                getAllStocksByProductIdOrderByASCWith0Stock(results.productId, (err, results2) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            msg: err
                        })
                    }

                    // Check stock availability
                    if (!results2) {
                        return res.status(404).json({
                            success: 0,
                            msg: 'Record not found'
                        })


                    } else {
                        let stockDefferent = results.stock - body.stock;

                        for (i = 0; i < results2.length; i++) {

                            const remainingStock = results2[i].stock + stockDefferent;

                            body.stockId = results2[i].id;

                            body.remainingStock = remainingStock;

                            updateStockCount(body, (err, results) => {
                                if (err) {
                                    return res.status(500).json({
                                        success: 0,
                                        msg: err
                                    })
                                }
                            });

                            i = results2.length;

                        }

                        update(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: err
                                })
                            }

                            return res.status(200).json({
                                success: 1,
                                msg: results
                            })

                        })


                    }
                });
            }
        }
    })


}

const getStockTransferById = (req, res) => {
    const id = req.params.id;

    getOneById(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: err
            })
        }

        if (!results) {
            return res.status(400).json({
                success: 0,
                msg: 'Record not found!'
            })
        } else {
            return res.status(200).json({
                success: 1,
                msg: results
            })
        }
    });
}

const getAllTransfer = (req, res) => {
    getAll((err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: err
            })
        }

        return res.status(200).json({
            success: 1,
            msg: results
        })
    });
}

const getStockAmountByStockTransfer = (req, res) => {
    const body = req.body;

    body.productId = req.params.productId;

    body.routeId = req.params.routeId;

    getStockAmountByRoute(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: err
            })
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found"
            })
        } else {
            return res.status(200).json({
                success: 1,
                msg: results
            })
        }
    });
}

module.exports = {
    createStockTransfer,
    getStockTransferById,
    getAllTransfer,
    getStockAmountByStockTransfer,
    updateStockTransfer
}