const express = require("express")
const router = express()
const userController = require("./user.controller")
const verifyToken = require("./user.middleware")
const { validate_signup } = require("../validation/validate-middleware")
const { signUpSchema } = require("../validation/auth-Validator")
const AdminMiddleWare = require("../Admin/AdminMiddleWare")

// router.route('/opt-verify').post(userController.sendOtp)

router.route("/register").post(validate_signup(signUpSchema), userController.register)

router.route("/login").post(userController.login)

router.route("/logout").post(verifyToken, userController.logout)

router.route("/get-user-info").get(verifyToken, userController.getUserInfo)

router.route("/update-user-info").patch(verifyToken, userController.updateUserInfo)

router.route("/delete-user/:id").delete(verifyToken, AdminMiddleWare, userController.deleteUser)

module.exports = router