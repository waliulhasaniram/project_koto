require("dotenv").config()
const mongoose = require("mongoose")

const connecrDB =async()=> {
    try {
        const connect_the_database = await mongoose.connect(process.env.DATABASE_URI)
        console.log("connected to the host->", connect_the_database.connection.port)
    } catch (error) {
        console.log("Database connection error")
        process.exit(1)
    }
}

module.exports = connecrDB;