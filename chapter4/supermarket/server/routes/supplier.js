import express from "express";
import { Supplier } from "../controller/supplier.js"

const supplierRouter = express.Router();
const SupplierController = new Supplier();

supplierRouter.get("/supplier", SupplierController.getAll);
supplierRouter.get("/supplier/:supplierId", SupplierController.getById);
supplierRouter.post("/", SupplierController.add);


export { supplierRouter }
