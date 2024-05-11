const TornilleriaController = require('../Controllers/TornilleriaController')
const router = require('express').Router();
const upload = require('../middlewares/multer')

router.post('/CreerCategorie',upload.single("image"), TornilleriaController.CreerCategorie)
router.post('/RechercheNomProduit', TornilleriaController.RechercheNomProduit)
router.post('/AjouterEnFonctionDeLaDates/:id', TornilleriaController.AjouterEnFonctionDeLaDates)
router.post('/AjouterMisCompras/:id', TornilleriaController.AjouterMisCompras)
router.get('/RecupererTouteMesValeurs', TornilleriaController.RecupererTouteMesValeurs)
router.post('/SuppressionNewVersion/:id', TornilleriaController.SuppressionNewVersion)
router.post('/AjouterTubosDansFavoris/:id',  TornilleriaController.AjouterTubosDansFavoris)
router.post('/getTubosFavoris', TornilleriaController.getTubosFavoris)
router.get('/RecupererTouteMesCompras', TornilleriaController.RecupererTouteMesCompras)
router.post('/SupprimerTornillos/:id', TornilleriaController.SupprimerTornillos)
router.post('/SuppressionNewVersionTornillos/:id', TornilleriaController.SuppressionNewVersionTornillos)
router.post('/AjouterTornilleria', TornilleriaController.AjouterTornilleria)

module.exports = router