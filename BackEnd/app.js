const express = require("express");
const app = express();
const cors = require('cors')

const morgan = require('morgan');

const notFoundMiddlware = require('./middleware/not-found');

const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/authRoutes");
const routeRouter = require("./routes/routeRouter");
const productRouter = require("./routes/produceRoutes");
const stockRouter = require("./routes/stockRouters");
const customerRouter = require("./routes/customerRoutes");
const stockTransfer = require("./routes/stockTransferRoutes");
const salesRouter = require("./routes/salesRoutes");
const customerHistoryRouter = require("./routes/customerHistoryRouter");
const wastageRouter = require("./routes/wastageStockRoutes");
const stockReturnRouter = require("./routes/stockReturnRouters");

app.use(cors());

app.use(morgan('tiny'));
app.use(express.json());


app.use("/api/v1/user/", userRouter);
app.use("/api/v1/login/", loginRouter);
app.use("/api/v1/route/", routeRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/stock/", stockRouter);
app.use("/api/v1/stock-transfer/", stockTransfer);
app.use("/api/v1/stock-return/", stockReturnRouter);
app.use("/api/v1/wastage/", wastageRouter);
app.use("/api/v1/customer/", customerRouter);
app.use("/api/v1/sales/", salesRouter);
app.use("/api/v1/customer-history/", customerHistoryRouter);

app.use(notFoundMiddlware);


module.exports = app;


app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})
