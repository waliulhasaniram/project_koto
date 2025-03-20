const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const useSchema = new Schema({
    userName: { type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    phone: {type: String, required: true, trim: true},
    refreshToken : {type : String, trim: true },
    isAdmin: {type: Boolean, default: false}
})

useSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
        next()
    }   
})

useSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

useSchema.methods.generateAccessToken = async function () {
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

useSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const User = new model("User", useSchema)

module.exports = User