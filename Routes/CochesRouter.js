const router = require("express").Router()
const CochesController = require('../Controllers/CochesCotroller')
const upload = require('../middlewares/multer')

const uploads = require('../middlewares/Upload')

router.post('/AjouterVoiture',upload.single("image"), CochesController.AjouterVoiture)
router.post('/AjoutVoitures',uploads.single("photo"), CochesController.AjoutVoitures)
router.get('/getVoiture', CochesController.getVoiture)
router.delete('/SupprimerVoiture/:id', CochesController.SupprimerVoiture)
router.put('/ModifierVoiture/:id', CochesController.ModifierVoiture)
router.post('/RappelerDateItv/:nomProprietaire', CochesController.RappelerDateItv)

module.exports = router