const FavorisController = require('../Controllers/FavorisController')
const router = require('express').Router()

router.post("/AddFavorite/:userName/:id", FavorisController.AjouterEtRetirerAuxFavoris)
router.post("/getDataUser", FavorisController.getDataUser)

module.exports = router