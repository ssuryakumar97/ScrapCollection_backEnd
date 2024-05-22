import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const registerOrder = async(req, res) => {
    const {email, name, contactNumber, address } = req.body
    try {
        const order = new Order({email, name, contactNumber, address })
        await order.save()
        res.status(200).json({message: "Your order registered successfully", data: order})
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getOrderById = async(req,res) => {
    try {
        const id = req.params.id
        const orders = await Order.findOne({_id: id})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getAllOrders = async(req,res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getAllCollectionAgent = async(req,res) => {
    try {
        const collectionAgent = await User.find({isCollectionAgent: true})
        res.status(200).json(collectionAgent)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getNotAssignedAgent = async(req,res) => {
    try {
        const collectionAgent = await User.find({isCollectionAgent: true, status: "notAssigned"})
        res.status(200).json(collectionAgent)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const collectionAgentAssignment = async(req, res) => {
    const {clientId, collectionAgentEmail} = req.body
    try {
        const collectionAgent = await User.findOne({email:collectionAgentEmail, status: "notAssigned"})
        // console.log(collectionAgent);
        const userOrder = await Order.findOne({_id:clientId, collectionStatus: "pending", collectionAgentStatus: "notAssigned"})
        // console.log(userOrder);
        if(collectionAgent == null || userOrder == null){
            return res.status(401).json({message: "Collection agent already assigned"})
        }
        const updatedUserOrder = await Order.findOneAndUpdate({_id:userOrder._id},{collectionAgentStatus:"assigned", collectionAgentDetails: collectionAgent}, {new: true}).populate("collectionAgentDetails")
        // console.log(updatedUserOrder);
        const updatedCollectionAgent = await User.findOneAndUpdate({_id:collectionAgent._id},{status:"assigned", assignmentDetails: userOrder}, {new: true}).populate("assignmentDetails")
        // console.log(updatedCollectionAgent);
        res.status(201).json({message: "Updated successfully", orderData: updatedUserOrder, agentData: updatedCollectionAgent})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}
