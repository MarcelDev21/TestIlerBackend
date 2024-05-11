const ContactController = require('../Controllers/ContactControllers')
const router = require("express").Router()
const upload = require('../middlewares/multer')



router.post("/createProduct", upload.single("image"), ContactController.addProduct)
router.get("/getProduct", ContactController.getProduct)

module.exports = router
