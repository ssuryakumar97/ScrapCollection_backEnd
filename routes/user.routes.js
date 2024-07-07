import express from "express"
import { registerUser, loginUser, getUser, getAllUser, getOnlyUsers, deleteUser, updateUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { collectionAgentAssignment, deleteOrderById, getAllCollectionAgent, getAllOrders, getAllOrdersByCollectionAgent, getNotAssignedAgent, getOrderById, getOrderByUsername, registerOrder } from "../controllers/order.controller.js"
import { deleteMaterialById, getAllMaterials, getMaterialById, updateMaterialById, uploadMaterial } from "../controllers/material.controller.js"
import { getInventoryMaterials, getInventoryMaterialsById, uploadSoldMaterial } from "../controllers/soldMaterial.controller.js"
import { uploadImage, downloadImage, deleteImage } from "../controllers/image.controller.js"
import { upload } from "../services/image.upload.js"
import {  deleteQuoteById, getAllQuotations, getAllQuotationsByUser, getQuoteById, newQuotation, quotationUpdateByAdmin, quotationUpdateByUser } from "../controllers/quotation.controller.js"

const router = express.Router()
//user routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/getUser", authMiddleware, getUser)
router.get("/user/getOnlyUsers", authMiddleware, getOnlyUsers)
router.get("/user/getAllUser", authMiddleware, getAllUser)
router.post("/user/updateUsers", authMiddleware, updateUser)
router.post("/user/deleteUser", authMiddleware, deleteUser)

//order Routes
router.post("/order/registerOrder", authMiddleware, registerOrder)
router.get("/order/getAllOrders", authMiddleware, getAllOrders)
router.post("/order/getOrderByUsername", authMiddleware, getOrderByUsername)
router.post("/order/getAllOrdersByCollectionAgent",authMiddleware, getAllOrdersByCollectionAgent)
router.get("/order/getOrderById/:id", authMiddleware, getOrderById)
router.delete("/order/deleteOrderById/:id",authMiddleware,deleteOrderById)
router.get("/order/getAllCollectionAgent", authMiddleware, getAllCollectionAgent)
router.get("/order/getNotAssignedAgent", authMiddleware,  getNotAssignedAgent)
router.post("/order/agentAssignment", authMiddleware, collectionAgentAssignment)

//material routes
router.post("/material/uploadMaterial",authMiddleware, uploadMaterial)
router.get("/material/getMaterialById/:id",authMiddleware, getMaterialById)
router.put("/material/updateMaterialById/:id",authMiddleware, updateMaterialById)
router.get("/material/getAllMaterials",authMiddleware, getAllMaterials)
router.delete("/material/deleteMaterialById/:id",authMiddleware, deleteMaterialById)

//upload sold material
router.post("/soldMaterial/uploadSoldMaterial",authMiddleware, uploadSoldMaterial)
router.get("/soldMaterial/inventory",authMiddleware, getInventoryMaterials)
router.get("/soldMaterial/inventoryMaterials/:id",authMiddleware, getInventoryMaterialsById)


//image upload routes
router.post("/image/upload",authMiddleware, upload.single("image"), uploadImage)
router.get("/image/download/:filename", downloadImage)
router.delete("/image/delete/:id",authMiddleware, deleteImage)

//quotation request routes
router.post("/quote/newQuotation",authMiddleware, newQuotation)
router.post("/quote/getAllQuotationsByUser",authMiddleware, getAllQuotationsByUser)
router.get("/quote/getAllQuotations",authMiddleware, getAllQuotations)
router.get("/quote/getQuoteById/:id",authMiddleware, getQuoteById)
router.delete("/quote/deleteQuoteById/:id",authMiddleware, deleteQuoteById)
router.post("/quote/quotationUpdate",authMiddleware, quotationUpdateByAdmin)
router.post("/quote/quotationUpdateByUser",authMiddleware, quotationUpdateByUser)

export default router