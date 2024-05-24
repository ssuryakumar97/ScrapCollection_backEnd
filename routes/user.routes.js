import express from "express"
import { registerUser, loginUser, getUser, getAllUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { collectionAgentAssignment, getAllCollectionAgent, getAllOrders, getNotAssignedAgent, getOrderById, registerOrder } from "../controllers/order.controller.js"
import { getAllMaterials, getMaterialById, uploadMaterial } from "../controllers/material.controller.js"
import { uploadSoldMaterial } from "../controllers/soldMaterial.controller.js"
import { uploadImage, downloadImage, deleteImage } from "../controllers/image.controller.js"
import { upload } from "../services/image.upload.js"
import {  getQuoteById, newQuotation, quotationUpdate } from "../controllers/quotation.controller.js"

const router = express.Router()
//user routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/getUser", authMiddleware, getUser)
router.get("/user/getAllUser", authMiddleware, getAllUser)

//order Routes
router.post("/order/registerOrder", registerOrder)
router.get("/order/getAllOrders", getAllOrders)
router.get("/order/getOrderById/:id", getOrderById)
router.get("/order/getAllCollectionAgent", getAllCollectionAgent)
router.get("/order/getNotAssignedAgent", getNotAssignedAgent)
router.post("/order/agentAssignment", collectionAgentAssignment)

//material routes
router.post("/material/uploadMaterial", uploadMaterial)
router.get("/material/getMaterialById/:id", getMaterialById)
router.get("/material/getAllMaterials", getAllMaterials)

//upload sold material
router.post("/soldMaterial/uploadSoldMaterial", uploadSoldMaterial)

//image upload routes
router.post("/image/upload", upload.single("image"), uploadImage)
router.get("/image/download/:filename", downloadImage)
router.delete("/image/delete/:id", deleteImage)

//quotation request routes
router.post("/quote/newQuotation", newQuotation)
router.get("/quote/getQuoteById", getQuoteById)
router.post("/quote/quotationUpdate", quotationUpdate)

export default router