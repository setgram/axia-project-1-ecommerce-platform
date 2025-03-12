import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  getOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/place", verifyUser, placeOrder);
router.get("/my-orders", verifyUser, getOrders);
router.put("/:id/status", verifyAdmin, updateOrderStatus);

export default router;
