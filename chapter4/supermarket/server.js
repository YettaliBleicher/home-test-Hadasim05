import express from "express";
import { productRouter } from "./server/routes/product.js";
import { supplierRouter } from "./server/routes/supplier.js";
import { productInOrderRouter } from "./server/routes/productInOrder.js";
import { orderRouter } from "./server/routes/order.js";
import { passwordRouter } from "./server/routes/password.js";

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.port || 3000

app.use(express.json()); 

import cors from 'cors'
app.use(cors());

//supplier 
app.use("/", supplierRouter);
app.use("/supplier", supplierRouter);
app.use("/supplier/:supplierId", supplierRouter);

//product
app.use("/", productRouter);
app.use("/product", productRouter);
app.use("/product/:productId", productRouter);

//productInOrder
app.use("/", productInOrderRouter)
app.use("/productInOrder/:orderId", productInOrderRouter)

//order
app.use("/", orderRouter);
app.use("/order", orderRouter);
app.use("/order/:supplierId", orderRouter);

//password
app.use("/", passwordRouter);
app.use("/password", passwordRouter);


app.listen(port, () => {
    console.log(`השרת רץ על פורט ${port}`);
});
