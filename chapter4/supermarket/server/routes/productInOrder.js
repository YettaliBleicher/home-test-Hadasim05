import express from "express";
import { ProductInOrder } from "../controller/productInOrder.js"

const productInOrderRouter = express.Router();
const ProductInOrderController = new ProductInOrder();

productInOrderRouter.get("/productInOrder/:orderId", ProductInOrderController.getById);
productInOrderRouter.post("/productInOrder", ProductInOrderController.add);


export { productInOrderRouter }
