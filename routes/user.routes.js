import express from "express"
import { registerUser, loginUser, getUser, getAllUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/getUser", authMiddleware, getUser)
router.get("/user/getAllUser", authMiddleware, getAllUser)

export default router