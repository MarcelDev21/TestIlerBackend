const AccueilDescription = require('../Controllers/AccueilDescription')
const router = require("express").Router()
const upload = require('../middlewares/multer')

router.post('/CreerDetail',upload.single("image"), AccueilDescription.CreerDetail)
router.get('/getDetail',AccueilDescription.getDetail)
router.post('/SendMail',AccueilDescription.SendMail)
router.post('/Notification',AccueilDescription.KeepDataNotification)

module.exports = router