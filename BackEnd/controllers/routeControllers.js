const { create, getOneRoute, getAll, deleteById, update, getAllWithoutOne } = require("../server/routeServer");


// add route
const createRoute = async (req, res) => {
    const body = req.body;

    body.cities = JSON.stringify(body.cities.split(','));

    //getRouteById for Check Duplicate routeNumber
    getOneRoute(body.routeNumber, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "databasse Error"
            });
        }

        // Not Duplicate routeNumber
        if (!results) {

            // Get all routes for check duplicate city
            getAll((err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        msg: "Database Error"
                    });
                }


                //Check duplicate city
                const bodyByCities = JSON.parse(body.cities);

                const duplicateCity = [];

                for (i = 0; i < result.length; i++) {

                    const citiesByCity = JSON.parse(result[i].cities);

                    for (j = 0; j < citiesByCity.length; j++) {
                        for (k = 0; k < bodyByCities.length; k++) {

                            if (citiesByCity[j].toLowerCase() == bodyByCities[k].toLowerCase()) {
                                duplicateCity.push(bodyByCities[k]);
                            }
                        }
                    }
                }

                //if not any data in routes table
                if (!result) {
                    create(body, (err, results) => {

                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                msg: "Database Error"
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            data: results
                        });
                    });
                } else {

                    if (duplicateCity.length == 0) {
                        create(body, (err, results) => {

                            if (err) {
                                console.log(err);
                                return res.status(500).json({
                                    success: 0,
                                    msg: "Database Error"
                                });
                            }

                            return res.status(200).json({
                                success: 1,
                                data: results
                            });
                        });
                    } else {

                        const errMsg = duplicateCity.toString();
                        return res.status(400).json({
                            success: 0,
                            msg: " Duplicated data",
                            duplicateData: errMsg
                        })
                    }
                }

            });

        } else {
            return res.status(400).json({
                success: 0,
                msg: "Duplicate Data"
            })
        }

    });


}

const getAllRoutes = async (req, res) => {
    getAll((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}

const getRouteById = async (req, res) => {
    const routeNumber = req.params.id
    getOneRoute(routeNumber, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "databasse Error"
            });
        }

        if (!results) {
            return res.status(500).json({
                success: 0,
                data: "Record not found!"
            });
        } else {
            return res.json({
                success: 1,
                data: results
            });
        }
    });
}

deleteRouteById = async (req, res) => {
    const id = req.params.id;

    deleteById(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: "DB Error"
            });
        }

        if (results.affectedRows == 0) {
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

const updateRoute = (req, res) => {
    const body = req.body;

    body.cities = JSON.stringify(body.cities.split(','));

    const id = req.params.id;
    body.id = id;

    getAllWithoutOne(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }


        //Check duplicate city
        const bodyByCities = JSON.parse(body.cities);

        const duplicateCity2 = [];

        for (i = 0; i < result.length; i++) {

            const citiesByCity = JSON.parse(result[i].cities);

            for (j = 0; j < citiesByCity.length; j++) {
                for (k = 0; k < bodyByCities.length; k++) {

                    if (citiesByCity[j].toLowerCase() == bodyByCities[k].toLowerCase()) {
                        duplicateCity2.push(bodyByCities[k]);
                        console.log(duplicateCity2);
                    }
                }
            }
        }

        //if not any data in routes table
        if (!result) {

            console.log(duplicateCity2);
            update(body, (err, results) => {

                if (err) {
                    console.log(err);
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })

            });
        } else {

            if (duplicateCity2.length == 0) {
                update(body, (err, results) => {

                    if (err) {
                        console.log(err);
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })

                });
            } else {

                const errMsg = duplicateCity2.toString();
                return res.status(400).json({
                    success: 0,
                    msg: " Duplicated data",
                    duplicateData: errMsg
                })
            }
        }

    });

}



module.exports = {
    createRoute,
    getAllRoutes,
    getRouteById,
    deleteRouteById,
    updateRoute
}