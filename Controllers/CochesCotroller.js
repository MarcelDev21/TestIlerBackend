const CochesSchema = require('../Models/Coches')
const cloudinary = require("cloudinary").v2;
const moment = require('moment');

module.exports= {
    AjouterVoiture : async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Coches"});
        //console.log(result)

        const newVoiture = new CochesSchema({
            nomProprietaire:req.body.nomProprietaire,
            immatriculationVoiture: req.body.immatriculationVoiture,
            imageVoiture:result.secure_url,
            cloudinary_id: result.public_id,
            dateItv: new Date(req.body.dateItv)
        })
        try {
        const RechercheMaticule = await CochesSchema.findOne({immatriculationVoiture: req.body.immatriculationVoiture})
        if(RechercheMaticule){
            console.log("kolo")
            res.status(202).json({message: "Cette Voiture existe deja"})
            return
        }
        await newVoiture.save()  
        console.log("toure")
        res.status(202).json(newVoiture) 
        } catch (error) {
            res.status(500).json({message: error})
        }

    },

    getVoiture : async (req, res) => {
        try {
           const getAllCars = await  CochesSchema.find()
           res.status(201).json(getAllCars);
        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    ModifierVoiture : async (req, res) => {
       const {nomProprietaire,immatriculationVoiture,imageVoiture,cloudinary_id, dateItv} = req.body
       const rechercherId = await  CochesSchema.findById(req.params.id)
        try {
            const modifierDataVoiture = await CochesSchema.findByIdAndUpdate(req.params.id, {$set: { 
                 nomProprietaire: nomProprietaire === "" ? rechercherId.nomProprietaire :  nomProprietaire ,
                 immatriculationVoiture: immatriculationVoiture === "" ? rechercherId.immatriculationVoiture :  immatriculationVoiture ,
                 imageVoiture: imageVoiture === undefined ? rechercherId.imageVoiture :  imageVoiture ,
                 cloudinary_id: cloudinary_id === undefined ? rechercherId.cloudinary_id :  cloudinary_id ,
                 dateItv: dateItv === undefined ? rechercherId.dateItv :  dateItv ,
                }},
                 {new: true})
                 res.status(202).json(modifierDataVoiture)
        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    SupprimerVoiture : async (req, res) => {
        try {
            const  supprimerLaVoiture = await CochesSchema.findByIdAndDelete(req.params.id)
            res.status(202).json({message: "Voiture supprimée avec succès", supprimerLaVoiture})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    RappelerDateItv : async (req, res) => {
       
        try {
            const recupereTouteDate = await CochesSchema.findOne({nomProprietaire: req.params.nomProprietaire}) 
            //console.log(recupereTouteDate)
            const parsedDate = moment(recupereTouteDate.dateItv, 'YYYY-MM-DD').toDate();
            //console.log("actuell",parsedDate)

           const dateRetenue = new Date(parsedDate)
           dateRetenue.setDate(dateRetenue.getDate() - 3)
           //console.log("date invalide",dateRetenue)
           if(dateRetenue < parsedDate){
               // console.log("faire une Notification")
                res.status(202).json({message: `la Voiture de ${recupereTouteDate.nomProprietaire} est bientot Itv`, recupereTouteDate})
           }else{
            //console.log("autre chose")
            return
           }
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}