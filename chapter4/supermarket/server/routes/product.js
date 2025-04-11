import express from "express";
import { Product } from "../controller/product.js"

const productRouter = express.Router();
const ProductController = new Product();

productRouter.get("/product", ProductController.getAll);
productRouter.get("/product/:productId", ProductController.getById);
productRouter.get("/products/:orderId", ProductController.getByOrderId);
productRouter.get("/productsBySupplier/:supplierId", ProductController.getBySupplierId);
productRouter.post("/product", ProductController.add);


export { productRouter }
