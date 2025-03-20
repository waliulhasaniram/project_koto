const ApiError = require("../utils/ApiError")

const AdminMiddleWare =(req, res, next)=>{
    try {
        const isHeAdmin = req.user?.isAdmin
        if(!isHeAdmin){
            throw new ApiError(400, "user is not an admin")
        }
        next()
    } catch (error) {
        throw new ApiError(500, "Admin Middleware error", error)
    }
}

module.exports = AdminMiddleWare;