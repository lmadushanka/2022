const { getAll } = require("../service/routeServer");
const { create, getAllCustomer, update, getWithoutOne, getById, deleteCustomer, customerCount } = require('../service/customerServer');

const createCustomer = (req, res) => {
    const body = req.body;

    body.status = 1;

    if (body.mobileNumber.length == 9 || body.mobileNumber.length == 10) {
        getAllCustomer((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    msg: 'Database error'
                });
            }

            let getContact = 0;

            for (i = 0; i < results.length; i++) {

                if (body.mobileNumber == results[i].mobileNumber) {
                    getContact = 1;
                }
            }

            if (getContact == 0) {
                getAll((err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            msg: 'Database error'
                        });
                    }

                    let routeId = '';

                    for (i = 0; i < results.length; i++) {

                        const citiesByCity = JSON.parse(results[i].cities);

                        for (j = 0; j < citiesByCity.length; j++) {

                            const routeCity = citiesByCity[j].toLowerCase();

                            const getCity = body.city.toLowerCase();

                            if (routeCity == getCity) {

                                routeId = results[i].id;
                            }
                        }
                    }

                    body.routeId = routeId;

                    if (!routeId) {
                        return res.status(400).json({
                            success: 0,
                            msg: "Cities not found any route"
                        })
                    } else {
                        create(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: 'Database error'
                                });
                            }

                            return res.status(200).json({
                                success: 1,
                                data: results
                            })
                        });
                    }

                });
            } else {
                return res.status(400).json({
                    success: 0,
                    msg: 'Duplicate Mobile Number'
                });
            }

        });
    } else {
        return res.status(400).json({
            success: 0,
            msg: 'Please provide valid contacts'
        });
    }




}

const getCustomer = (req, res) => {
    getAllCustomer((err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Database error'
            });
        }

        return res.status(200).json({
            success: 1,
            data: results
        })
    });
}

const getCustomerById = (req, res) => {
    getById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Database error'
            });
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            })
        }


    });

}

const updateCustomer = (req, res) => {
    const body = req.body;

    body.id = req.params.id;

    if (body.mobileNumber.length == 10 || body.mobileNumber.length == 9) {
        getById(req.params.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    msg: 'Database error'
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 0,
                    msg: "Record not Found"
                })
            } else {

                getWithoutOne(req.params.id, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            msg: 'Database error'
                        });
                    }

                    let getContact = 0;

                    for (i = 0; i < results.length; i++) {

                        if (body.mobileNumber == results[i].mobileNumber) {
                            getContact = 1;
                        }
                    }

                    if (getContact == 0) {
                        getAll((err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    msg: 'Database error'
                                });
                            }

                            let routeId = '';

                            for (i = 0; i < results.length; i++) {

                                const citiesByCity = JSON.parse(results[i].cities);

                                for (j = 0; j < citiesByCity.length; j++) {

                                    const routeCity = citiesByCity[j].toLowerCase();

                                    const getCity = body.city.toLowerCase();

                                    if (routeCity == getCity) {

                                        routeId = results[i].id;
                                    }
                                }
                            }

                            body.routeId = routeId;

                            if (!routeId) {
                                return res.status(400).json({
                                    success: 0,
                                    msg: "Cities not found"
                                })
                            } else {

                                update(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            msg: 'Database error'
                                        });
                                    }

                                    if (results) {
                                        return res.status(200).json({
                                            success: 1,
                                            data: results
                                        })
                                    } else {
                                        return res.status(400).json({
                                            success: 0,
                                            msg: 'Record not found'
                                        });
                                    }


                                });
                            }

                        });
                    } else {
                        return res.status(400).json({
                            success: 0,
                            msg: 'Duplicate data'
                        });
                    }

                });
            }
        });
    } else {
        return res.status(400).json({
            success: 0,
            msg: 'Please provide valid contacts'
        });
    }

}

deleteCustomerById = (req, res) => {

    deleteCustomer(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Database error'
            });
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                msg: 'Record not found'
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            })
        }
    })
}

const getCustomerCount = (req, res) => {

    customerCount((err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: 'Database error'
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer,
    getCustomerById,
    deleteCustomerById,
    getCustomerCount
}