const multer = require('multer');
const storage = multer.diskStorage({
destination: function (req, file, callback) {
callback(null, './uploads');
},
filename: function (req, file, callback) {
callback(null, Date.now() + file.originalname);
},
});
const upload = multer({
storage: storage,
limits: {
fieldSize: 1024 * 1024 * 25,
//fileSize: 5 * 1024 * 1024 // Max file size is set to 2MB
//fieldNameSize: 100,
},


});
module.exports =upload;