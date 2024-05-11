const router = require("express").Router()
const CochesController = require('../Controllers/CochesCotroller')
const upload = require('../middlewares/multer')

router.post('/AjouterVoiture',upload.single("image"), CochesController.AjouterVoiture)
router.get('/getVoiture', CochesController.getVoiture)
router.delete('/SupprimerVoiture/:id', CochesController.SupprimerVoiture)
router.put('/ModifierVoiture/:id', CochesController.ModifierVoiture)
router.post('/RappelerDateItv/:nomProprietaire', CochesController.RappelerDateItv)

module.exports = router