const CableController =require('../Controllers/CableController')
const router = require('express').Router();
const upload = require('../middlewares/multer')

router.post('/AjoutCable', upload.single("image"), CableController.AjoutCable)
router.post('/AjoutAuFavoris/:id',  CableController.AjoutAuFavoris)
router.post('/AjoutQuantite/:id',  CableController.AjoutQuantite)
router.post('/RetirerMonProduit/:id',  CableController.RetirerMonProduit)
router.get('/getFavoris',  CableController.getFavoris)
router.get('/getCables',  CableController.getCables)

router.post('/AjoutAmisComprasCables/:id',  CableController.AjoutAmisComprasCables)
router.post('/AjouterEnFonctionDeLaDates/:id',  CableController.AjouterEnFonctionDeLaDates)
router.get('/RecupererTouteMesValeurs',  CableController.RecupererTouteMesValeurs)
router.post('/SuppressionNewVersionCable/:id',  CableController.SuppressionNewVersionCable)
router.post('/SuppressionMisCompras/:id',  CableController.SuppressionMisCompras)
router.get('/RecupererTouteMesComprasCables',  CableController.RecupererTouteMesComprasCables)

module.exports = router