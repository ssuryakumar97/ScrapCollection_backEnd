import express from "express"
import { registerUser, loginUser, getUser, getAllUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { collectionAgentAssignment, getAllCollectionAgent, getAllOrders, registerOrder } from "../controllers/order.controller.js"

const router = express.Router()

router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/getUser", authMiddleware, getUser)
router.get("/user/getAllUser", authMiddleware, getAllUser)
router.post("/order/registerOrder", registerOrder)
router.get("/order/getAllOrders", getAllOrders)
router.get("/order/getAllCollectionAgent", getAllCollectionAgent)
router.post("/order/agentAssignment", collectionAgentAssignment)
// router.post("/order/getOrder")
// router.post("/order/getAllOrder")

export default router