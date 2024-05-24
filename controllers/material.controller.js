import MaterialModel from "../models/material.model.js";

export const uploadMaterial = async(req,res) => {
    try {
        const {title, description, image, price, unitsOfMeasurement} = req.body;
        const oldMaterial = await MaterialModel.findOne({title})
        if(oldMaterial){
          return res.status(401).json({message: "Material already exists"})
        }
        const newMaterial =  MaterialModel({title, description, image, price,unitsOfMeasurement})
        await newMaterial.save()
        
        res.status(200).json({message: "Material added successfully", data: newMaterial})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getMaterialById = async(req,res) => {
    try {
        const id = req.params.id
        const material = await MaterialModel.findOne({_id:id})
        res.status(200).json(material)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting material"})
    }
}

export const getAllMaterials = async(req, res) => {
    try {
        const allMaterials = await MaterialModel.find()
        res.status(200).json(allMaterials)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting all materials"})
    }
}