const {
    customerWiseAllSale,
    customerWiseGrandTotal,
    customerWiseSalesCount,
    customerWiseToalDiscount,
    customerWiseTotalPaid,
} = require('../service/customerHistoryServer');

const getSalesCountCustomerWise = (req, res) => {
    const id = req.params.id;

    customerWiseSalesCount(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!result) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found!"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    });
}

getCustomerWiseSales = (req, res) => {
    const id = req.params.id;

    customerWiseAllSale(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!result) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found!"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    })
}

const getGrandTotal = (req, res) => {
    const id = req.params.id;

    customerWiseGrandTotal(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!result) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found!"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    })
}

const totalPaidAmount = (req, res) => {
    const id = req.params.id;

    customerWiseTotalPaid(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!result) {
            return res.status(404).json({
                success: 0,
                msg: "Record not found!"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    })
}

module.exports = {
    getSalesCountCustomerWise,
    getCustomerWiseSales,
    getGrandTotal,
    totalPaidAmount
}