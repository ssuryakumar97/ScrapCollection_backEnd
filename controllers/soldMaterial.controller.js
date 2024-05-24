import SoldMaterialModel from "../models/soldMaterial.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import InventoryModel from "../models/inventory.model.js";
import MaterialModel from "../models/material.model.js";
// import OrderModel from "../models/order.model.js";

export const uploadSoldMaterial = async(req, res) => {
    try {
        const {userEmail, agentEmail, materialSold, orderId} = req.body
        console.log(orderId)
        const soldMaterial = await SoldMaterialModel({userEmail, agentEmail, materialSold, orderDetails: orderId})
        await soldMaterial.save();
        const orderDetails = await OrderModel.findOneAndUpdate({_id: orderId}, {collectionStatus: "success", materialSoldDetails: soldMaterial._id})
        const agentDetails = await UserModel.findOneAndUpdate({email: agentEmail},{status: "notAssigned", assignmentDetails: null}, {new: true})
        const updatedOrderDetails = await OrderModel.findOne({_id: orderId}).populate("materialSoldDetails")
        // console.log(ddd.orderDetails)
        const findSoldMaterial = await SoldMaterialModel.findOne({_id: soldMaterial._id}).populate("orderDetails")
        
        // console.log(titleFind);
        for(let ind= 0; ind<materialSold.length; ind++){
            var inventoryFind = await InventoryModel.findOne({title: materialSold[ind].title})
            var materialFind = await MaterialModel.findOne({title: materialSold[ind].title})
            if(inventoryFind == null){
                var totalUpdatedPrice = materialFind != null ? materialFind.price * materialSold[ind].quantity : materialSold[ind].totalPrice
                var inventory = await InventoryModel({title: materialSold[ind].title, totalQuantity: materialSold[ind].quantity, unitsOfMeasurement: materialSold[ind].unitsOfMeasurement, totalPrice: totalUpdatedPrice})
                await inventory.save()
            } else {
                var totalUpdatedQuantity = inventoryFind.totalQuantity + materialSold[ind].quantity
                var totalUpdatedPrice = materialFind != null ? materialFind.price * totalUpdatedQuantity : inventoryFind.totalPrice + materialSold[ind].totalPrice    
                var updatedInventory = await InventoryModel.findOneAndUpdate({title: materialSold[ind].title},{totalQuantity: totalUpdatedQuantity, totalPrice: totalUpdatedPrice})
            }
        }
        const inventoryDetails = await InventoryModel.find()
        // res.status(200).json({message: "Material added successfully", soldData: findSoldMaterial , orderData: updatedOrderDetails, agentData: agentDetails})
        res.status(200).json({inventoryDetails})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}