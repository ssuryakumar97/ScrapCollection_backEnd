import QuotationModel from "../models/quotation.model.js"

export const newQuotation = async(req,res) => {
    try {
        const {userEmail, materials} = req.body
        const quote = await QuotationModel({userEmail, materials})
        await quote.save()
        res.status(201).json({message: "Quotation request created successfully", data: quote})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}


export const getQuoteById = async(req, res) => {
    try {
        const {id} = req.params
        // console.log(id)
        const getQuote = await QuotationModel.findOne({_id: id})
        res.status(200).json({data: getQuote})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const deleteQuoteById = async(req,res) => {
    try {
        const {id} = req.params
        // console.log(id);
        const deletedQuote = await QuotationModel.deleteOne({_id:id})
        res.status(201).json({message: "Quotation Data deletd successfully", data: deletedQuote}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getAllQuotations = async(req,res) => {
    try {
        const getAllQuote = await QuotationModel.find()
        res.status(200).json({data: getAllQuote})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getAllQuotationsByUser = async(req,res) => {
    try {
        const {email} = req.body
        const getAllQuote = await QuotationModel.find({userEmail: email})
        res.status(200).json({data: getAllQuote})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const quotationUpdateByAdmin = async(req,res) => {
    try {
        const {id,materials} = req.body
        const quoteUpdate = await QuotationModel.findOneAndUpdate({_id: id}, {materials, status: "approxQuote"},{new: true})
        res.status(201).json({message: "Quotation update with final approx price successfully", data: quoteUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
} 

export const quotationUpdateByUser = async(req,res) => {
    try {
        const {id,status} = req.body
        // console.log(id,status)
        const userQuoteUpdate = await QuotationModel.findOneAndUpdate({_id: id}, {status},{new: true})
        res.status(201).json({message: "Quotation updated with user status successfully", data: userQuoteUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
} 