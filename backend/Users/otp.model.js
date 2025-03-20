const {Schema, model} = require("mongoose")

const otpSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
       type: String,
       trim:true 
    },
    otpExpiration: {
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration)
    }
    

})

const otpModel = new model("otp", otpSchema)

module.exports = otpModel