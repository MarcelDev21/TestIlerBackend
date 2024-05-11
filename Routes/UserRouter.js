const router = require('express').Router()
const userController = require('../Controllers/UserController')

router.post( '/creerCompte',userController.creerCompte)
router.post( '/LoginUser',userController.LoginUser)
router.delete( '/deleteUser',userController.deleteUser)
router.post( '/ModifierUser/:id/:nom',userController.AfficherUser)


module.exports = router