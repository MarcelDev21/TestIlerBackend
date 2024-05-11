const ProductController = require('../Controllers/ProduitController')
const router = require("express").Router()
const upload = require('../middlewares/multer')

router.post("/createProduct", upload.single("image"), ProductController.AddNewProduct)
router.get("/getProduct/:title", ProductController.getProduct)
router.get("/getAllProduct", ProductController.getAllProduct)
router.post("/AjouternouvelleVariable/:title", ProductController.AjouternouvelleVariable)
router.get("/getAllTitle", ProductController.getAllTitle)

module.exports = router