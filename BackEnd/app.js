require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')

const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/authRoutes");
const routeRouter = require("./routes/routeRouter");
const productRouter = require("./routes/produceRoutes");
const stockRouter = require("./routes/stockRouters");
const customerRouter = require("./routes/customerRoutes");
const stockTransfer = require("./routes/stockTransferRoutes");
const salesRouter = require("./routes/salesRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/login/", loginRouter);
app.use("/api/v1/route/", routeRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/stock/", stockRouter);
app.use("/api/v1/customer/", customerRouter);
app.use("/api/v1/stockTransfer/", stockTransfer);
app.use("/api/v1/sales/", salesRouter);



app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening port ${process.env.APP_PORT}`);
});