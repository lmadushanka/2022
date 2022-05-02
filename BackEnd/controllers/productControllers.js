const { create, getOne, getAll, update, deleteOne, checkDuplicated } = require("../service/productServer");

const createProduct = async (req, res) => {
    const body = req.body;
    body.status = 1;

    checkDuplicated(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!results) {
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
                })
            });
        } else {
            return res.status(400).json({
                success: 0,
                msg: "Duplicate Product"
            })
        }
    });
}

const getProductByProductCode = async (req, res) => {
    const id = req.params.id;

    getOne(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (!results) {
            return res.status(400).json({
                success: 0,
                msg: "Record not found"
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results
            })
        }

    });
}

const getAllProducts = async (req, res) => {
    getAll((err, results) => {
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
        })
    });
}

const updateProductById = async (req, res) => {
    const body = req.body;

    body.id = req.params.id;

    update(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }
        if (!results) {
            return res.status(400).json({
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

const deleteProductById = async (req, res) => {
    const id = req.params.id;

    deleteOne(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                msg: "Database Error"
            });
        }

        if (results.affectedRows == 0) {
            return res.status(400).json({
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
    createProduct,
    getProductByProductCode,
    getAllProducts,
    updateProductById,
    deleteProductById
}