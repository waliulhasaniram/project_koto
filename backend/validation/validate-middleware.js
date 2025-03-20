const asyncHandler = require("../utils/asyncHandler")

const validate_signup =(Schema)=> asyncHandler(async(req, res, next)=>{
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next()

    } catch (err) {
        const status = 422
        const message = "fill in all the inputs"
        const extraMessage = err.errors[0].message

        const error = {status, message, extraMessage}
        res.status(400).json({error})
        //console.log(error)
    }
})

const validate_contact =(Schema)=> asyncHandler(async(req, res, next)=>{
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next()

    } catch (err) {
        const status = 422
        const message = "fill in all the inputs"
        const extraMessage = err.errors[0].message

        const error = {status, message, extraMessage}
        res.status(400).json({error})
        //console.log(error)
    }
})

module.exports = {validate_signup, validate_contact}