require("dotenv").config();
const express = require("express");
const app = express();
const routerProduct = require("../Product/Product.route");
const routerUser = require("../Users/user.route");
const routerAdmin = require("../Admin/Adminr.route");
const routerContact = require("../Contacts/Contact.route");
const connecrDB = require("../utils/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleWare = require("../validation/errorMiddleware");
const port = process.env.PORT
const path = require("path");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  method: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public/temp")));
app.use(cookieParser());

// Routes
app.use("/api/p", routerProduct);
app.use("/api/u", routerUser);
app.use("/api/a", routerAdmin);
app.use("/api/c", routerContact);

app.use(errorMiddleWare);

app.get("/", (req, res)=>{
  res.send("hello api")
})

// Connect DB and export  for vercel
// connecrDB()
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.error("Database connection failed:", err));

  
connecrDB().then(()=>{
    app.listen(port || 3000, ()=>{
            console.log(`server is running at port number http://localhost:${port}`)
        })
    })
        
module.exports = app;  // 👈 Critical for Vercel