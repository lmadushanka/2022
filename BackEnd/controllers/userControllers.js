const { create, getUsers, getUserById, checkExistingUser, updateUser, deleteUser } = require("../server/userServer");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const createUser = async (req, res) => {
    const email = req.body.email;
    checkExistingUser(email, (err, results) => {

        if (err) {
            console.log(err);
        }

        if (!results) {
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            create(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        msg: "Database connection Error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            });
        } else {
            if (results.email != req.body.email) {
                const body = req.body;
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            msg: "Database connection Error"
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
                    msg: "Duplicate email address!"
                });
            } s
        }



    });


}

const getAllUser = async (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    })
}

const getOneUser = async (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                msg: "Record not found"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    })
}

const updateUserById = async (req, res) => {
    const body = req.body;

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const id = req.params.id;
    body.id = id;
    updateUser(body, (err, results) => {

        if (err) {
            console.log(err);
        }
        return res.status(200).json({
            success: 1,
            data: results
        })

    });
}

deleteUserById = async (req, res) => {
    const id = req.params.id;

    deleteUser(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                msg: "DB Error"
            });
        }
            return res.status(200).json({
                success: 1,
                data: results
            });

    });
}



module.exports = {
    createUser,
    getAllUser,
    getOneUser,
    updateUserById,
    deleteUserById
}

