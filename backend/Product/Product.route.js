const express = require("express");
const router = express() 
const productController = require("./Product.controller");
const upload = require("./multerMiddleware");
const verifyToken = require("../Users/user.middleware");
const AdminMiddleWare = require("../Admin/AdminMiddleWare");

router.route("/").get(productController.Home)

router.route("/post-product").post(verifyToken, AdminMiddleWare, upload.single("productAvatar"), productController.PostProduct)

router.route("/allProducts").get(productController.GetAllProducts)

router.route("/allProducts-byDivision").get(productController.GetAllProductByDivisionAndType)

router.route("/allproduct-type").get(productController.GetOnlyProductByType)

router.route("/searched-product").get(productController.GetSearchProduct)

router.route("/delece-product/:id").delete(productController.deleteProduct)


router.route("/a_z").get(productController.GetAllProduct_A_Z)
router.route("/z_a").get(productController.GetAllProduct_Z_A)
router.route("/low_high").get(productController.GetAllProduct_LOW_HIGH)
router.route("/high_low").get(productController.GetAllProduct_HIGH_LOW)

module.exports = router;
