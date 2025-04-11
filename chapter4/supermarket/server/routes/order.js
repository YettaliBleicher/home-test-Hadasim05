import express from "express";
import { Order } from "../controller/order.js"

const orderRouter = express.Router();
const OrderController = new Order();

orderRouter.get("/order/:supplierId", OrderController.getBySupplierId);
orderRouter.get("/orders/:statusId", OrderController.getByStatusId);
orderRouter.put("/order/:orderId/:statusId", OrderController.update);
orderRouter.post("/order", OrderController.add);



export { orderRouter }