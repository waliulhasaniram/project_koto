const errorMiddleWare =(err, req, res, next)=>{
    const status = err.status || 500
    const message = err.message || "backend error"
    const extraMessage = err.extraMessage || "internal server error"

    return res.status(status).json({message, extraMessage})
}

module.exports = errorMiddleWare