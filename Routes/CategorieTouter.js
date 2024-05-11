const CategorieController = require('../Controllers/CategorieController')
const router = require("express").Router()
const upload = require('../middlewares/multer')

router.post("/createCategorie/:id", CategorieController.AddNewProduct)
router.get("/AugmenterProduit/:id/:nomUser/:quantite", CategorieController.AugmenterProduit)
router.get("/EffectuerRetraitProduit/:id/:nomUser/:quantite", CategorieController.EffectuerRetraitProduit)
router.get("/EffectuerRetraitProduitPrecis/:id", CategorieController.EffectuerRetraitProduitPrecis)
router.get("/EffectuerRetraitProduitUnique/:id", CategorieController.EffectuerRetraitProduitUnique)
router.get("/EffectuerRetraitParNomEtDate", CategorieController.EffectuerRetraitParNomEtDate)
router.get("/EnleverProduitRetrait/:nomUser/:id", CategorieController.EnleverProduitRetrait)
router.get("/getAllRetrait", CategorieController.getAllRetrait)

module.exports = router