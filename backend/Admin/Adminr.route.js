const express = require("express")
const router = express()
const adminController = require("./Admin.controller")
const AdminMiddleWare = require("./AdminMiddleWare")
const verifyToken = require("../Users/user.middleware")

router.route("/adminUsers").get(verifyToken, AdminMiddleWare, adminController.GetAllUsers)

router.route("/adminUpdateUsers/:id").patch(verifyToken, AdminMiddleWare, adminController.adminUpdatesUserData)

router.route("/adminDeleteUser/:id").delete(verifyToken, AdminMiddleWare, adminController.adminDeletesUser)

router.route("/adminGetProducts").get(verifyToken, AdminMiddleWare, adminController.adminGetAllProduct)

router.route("/adminSearchProduct").get(verifyToken, AdminMiddleWare, adminController.adminSearchProduct)

router.route("/update-price/:id").patch(verifyToken, AdminMiddleWare, adminController.productPriceUpdate)

module.exports = router