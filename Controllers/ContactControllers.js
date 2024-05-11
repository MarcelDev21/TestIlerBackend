const ContactSchema = require('../Models/ContactModel')
//const cloudinary = require('../utils/cloudinary')
const cloudinary = require("cloudinary").v2;

module.exports = {
    addProduct : async(req, res) => {
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Ilerdagua"});
        const NewContact = new ContactSchema({name: req.body.name, image: result.secure_url, cloudinary_id: result.public_id})
        try {
            await NewContact.save()
            res.status(202).json(NewContact)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getProduct : async (req,res) => {
        try {
            const restApi = await ContactSchema.find()
            res.status(200).json(restApi)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
