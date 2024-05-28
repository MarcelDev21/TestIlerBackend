
const  CloudinaryStorage  = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'newVoitures',
   // allowedFormats: ['jpg', 'png'],
    format: async (req, file) => 'jpeg', // supports promises as well
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
