import express from "express";
import { Password } from "../controller/password.js"

const passwordRouter = express.Router();
const PasswordController = new Password();

passwordRouter.post("/password", PasswordController.check);

export { passwordRouter }
