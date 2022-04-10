import express from "express";
import Product from '../models/productModel.js'
import asyncHandler from "express-async-handler";
import { addOrderItems, getOrderById, updateOrderToPaid, getOrdersById, getOrders, updateOrderToDelivered } from "../controllers/orderControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getOrdersById)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)



export default router