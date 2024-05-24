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
        const {id} = req.body
        const getQuote = await QuotationModel.findOne({_id: id})
        res.status(200).json({data: getQuote})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const quotationUpdate = async(req,res) => {
    try {
        const {id,materials} = req.body
        const quoteUpdate = await QuotationModel.findOneAndUpdate({_id: id}, {materials, status: "approxQuote"},{new: true})
        res.status(201).json({message: "Quotation update with final approx price successfully", data: quoteUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
} 
