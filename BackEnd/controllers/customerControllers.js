const { getAll } = require("../server/routeServer");
const { create, getAllCustomer, update, getWithoutOne, getById } = require('../server/customerServer');

const createCustomer = (req, res) => {
    const body = req.body;

    if (body.mobileNumber.length == 10 && body.alternateNumber == 10 && body.landLine == 10) {
        getAllCustomer((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    msg: 'Database error'
                });
            }

            let getContact = 0;

            for (i = 0; i < results.length; i++) {

                if (body.mobileNumber == results[i].mobileNumber || body.landLine == results[i].landLine || body.alternateNumber == results[i].alternateNumber) {
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
                    msg: 'Duplicate data'
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

const updateCustomer = (req, res) => {
    const body = req.body;

    body.id = req.params.id;

    if (body.mobileNumber.length == 10 && body.alternateNumber == 10 && body.landLine == 10) {
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

                        if (body.mobileNumber == results[i].mobileNumber || body.landLine == results[i].landLine || body.alternateNumber == results[i].alternateNumber) {
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

                                    console.log(results);

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

module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer
}