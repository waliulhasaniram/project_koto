const express = require('express')
const router = express()
const contactController = require("./Contact.controller")
const verifyToken = require("../Users/user.middleware")
const AdminMiddleWare = require('../Admin/AdminMiddleWare')
const { validate_signup } = require('../validation/validate-middleware')
const { contactSchema } = require('../validation/auth-Validator')

router.route("/post-contact").post(verifyToken, validate_signup(contactSchema), contactController.postContact)

router.route("/get-all-contacts").get(verifyToken, AdminMiddleWare,  contactController.getContacts)

router.route("/delect-contact/:id").delete(verifyToken, AdminMiddleWare, contactController.deleteContact)

module.exports = router