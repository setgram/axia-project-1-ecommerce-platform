import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add", verifyUser, addToCart);
router.get("/", verifyUser, getCart);
router.delete("/remove", verifyUser, removeFromCart);

export default router;
