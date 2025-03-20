const Contact = require("./Contact.model")
const asyncHandler = require("../utils/asyncHandler") 
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")

const postContact =asyncHandler(async(req, res)=>{
    
        const {userName, email, message} = req.body

        if(!userName && !email && !message){
            throw new ApiError(400, "fill all the informations")
        }
        const createContact = await Contact.create({userName, email, message})

        if(!createContact){throw new ApiError(400, "cannot create new contact")}

        res.status(200).json(new ApiResponse(200, createContact, "new contact created"))  
})

const getContacts = asyncHandler(async(req, res)=>{
    const getAllContacts = await Contact.find({})

    if(!getAllContacts) {throw new ApiError(400, "no contacts are available")}

    res.status(200).json(new ApiResponse(200, getAllContacts, "all contacts"))
})

const deleteContact = asyncHandler(async(req, res) => {
    const id = req.params.id
    await Contact.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "message deleted"))
})

module.exports = {postContact, getContacts, deleteContact}