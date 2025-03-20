require("dotenv").config()
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("./User.model");


const generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const userToken = await User.findOne({_id : userId})
        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()
    
        userToken.refreshToken = refreshToken
        await userToken.save({validateBeforeSave:false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(400, "can't generate token")
    }
}

const register = asyncHandler(async (req, res) => {
    const {userName, password, email, phone} = req.body

    const emailExists = await User.findOne({email})
    if(emailExists) {
        throw new ApiError(400, "user already exists")
    }else{
        const createUser = await User.create({userName, password, email, phone})
        
        if(!createUser){ throw new ApiError(200, "can't save data")}
        
        res.status(200).json(new ApiResponse(200, createUser, "user registration complete!"))
    }
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const userExists = await User.findOne({email: email})
    if(!userExists){
        throw new ApiError(400, "user doesn't exists")
    }else{
        const comparePassword = await userExists.isPasswordCorrect(password)

        if(!comparePassword){ throw new ApiError(400, "invalid credentials")}
        else{
            const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(userExists._id)

            const logedinUser = await User.findOne({_id: userExists._id}).select({password : 0})

            const options = {
                httpOnly : true,
                secure : true
            }

            res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).status(200)
            .json(new ApiResponse(200, {userExists: logedinUser, accessToken, refreshToken}, "successfully logged in"))
        }
    }

});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {$unset: {refreshToken: 1}}, {new:true})
    const options = {
        httpOnly : true,
        secure : true
    }

    return res.clearCookie("accessToken", options).clearCookie("refreshToken", options).status(200)
    .json(new ApiResponse(200, {}, "logout successful"))
});

const getUserInfo = asyncHandler(async (req, res) => {
    return await res.status(200).json(new ApiResponse(200, req.user, "logged in user data"))
});

const updateUserInfo = asyncHandler(async (req, res) => {
    const {userName, email, phone} = req.body

    if(!userName || !email || !phone){
        throw new ApiError(400, "fill all the inputs")
    }

    const updateUser = await User.findByIdAndUpdate({_id: req.user?._id}, {$set: {userName:userName, email:email, phone:phone}}, {new:true}).select({password:0, refreshToken:0})

    res.status(200).json(new ApiResponse(200, updateUser, "user info updated"))
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    await User.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "user deleted"))
})

module.exports = {register, login, logout, getUserInfo, updateUserInfo, deleteUser}