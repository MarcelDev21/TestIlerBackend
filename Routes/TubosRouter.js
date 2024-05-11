const router = require('express').Router()
const upload = require('../middlewares/multer')
const TubosController = require('../Controllers/TubosController')


router.post('/CreerCategorie', upload.single("image"),  TubosController.CreerCategorie)
router.post('/CreerCategorieDesaigua', upload.single("image"),  TubosController.CreerCategorieDesaigua)
router.post('/CreerCategoriePoliEtileno', upload.single("image"),  TubosController.CreerCategoriePoliEtileno)
router.post('/CreerCategorieFlexible', upload.single("image"),  TubosController.CreerCategorieFlexible)
router.post('/CreerPvc',  TubosController.CreerPvc)
router.post('/CreerDesaigua',  TubosController.CreerDesaigua)
router.post('/crearPolietileno',  TubosController.crearPolietileno)
router.post('/crearFlexibles',  TubosController.crearFlexibles)

router.get('/AfficherNomProduit',  TubosController.AfficherNomProduit)
router.post('/RetirerProduit/:id',  TubosController.RetirerProduit)
router.post('/AjouterDansRetrait/:id',  TubosController.AjouterDansRetrait)
router.post('/RecherchePvc', TubosController.RecherchePvc)
router.post('/RechercheNomProduit', TubosController.RechercheNomProduit)
router.post('/RechercheNomDesagua', TubosController.RechercheNomDesagua)
router.post('/RechercheNomPoliEtileno', TubosController.RechercheNomPoliEtileno)
router.post('/RechercheNomFlexibles', TubosController.RechercheNomFlexibles)


router.post('/AjouterTubosDansFavoris/:id', TubosController.AjouterTubosDansFavoris)
router.post('/getTubosFavoris', TubosController.getTubosFavoris)
router.post('/RetirerProduitEnFonctionDate/:id', TubosController.RetirerProduitEnFonctionDate)
router.post('/AjouterEnFonctionDeLaDate/:id', TubosController.AjouterEnFonctionDeLaDate)
router.get('/getAllMisTubos', TubosController.getAllMisTubos)
router.delete('/SuppressionValue/:id', TubosController.SuppressionValue)
router.post('/AugmenterQuantiteEnStockTubos/:id', TubosController.AugmenterQuantiteEnStockTubos)
router.get('/getTubosAEnregistrer', TubosController.getTubosAEnregistrer)
router.post('/SuppressionCompras/:id', TubosController.SuppressionCompras)
router.post('/AjouterEnFonctionDeLaDates/:id', TubosController.AjouterEnFonctionDeLaDates)
router.post('/AjouterMisCompras/:id', TubosController.AjouterMisCompras)
router.get('/RecupererTouteMesValeurs', TubosController.RecupererTouteMesValeurs)
router.get('/RecupererTouteMesCompras', TubosController.RecupererTouteMesCompras)
router.post('/SuppressionNewVersion/:id', TubosController.SuppressionNewVersion)
router.post('/SuppressionMisCompras/:id', TubosController.SuppressionMisCompras)


module.exports = router