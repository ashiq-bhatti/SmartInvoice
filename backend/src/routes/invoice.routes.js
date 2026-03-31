import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createInvoice,
  getInvoices,
  getSingleInvoice,
  updateInvoiceStatus,
  deleteInvoice,
} from "../controllers/invoice.controller.js";

const invoiceRouter = express.Router();

//  protect all Routes
invoiceRouter.use(authMiddleware);

invoiceRouter.post("/create", createInvoice);
invoiceRouter.get("/", getInvoices);
invoiceRouter.get("/:id", getSingleInvoice);
invoiceRouter.put("/:id", updateInvoiceStatus);
invoiceRouter.delete("/:id", deleteInvoice);

export default invoiceRouter;