const ProduitModel = require('../Models/ProduitModel')
const CategorieProduct = require('../Models/CategorieModel')
const cloudinary = require("cloudinary").v2;

module.exports = {
    AddNewProduct : async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Ilerdagua"});

      //  console.log(result)

        const newProduct =  new ProduitModel({
            title: req.body.title,
            image:result.secure_url,
            cloudinary_id: result.public_id,
        })

        try {
          if(newProduct){
            await newProduct.save()
            res.status(202).json(newProduct)
          }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getProduct : async(req,res) => {
      console.log(req.params.title)
            try {       
                const newProduct = await ProduitModel.findOne({title:req.params.title}).populate('type','CategorieProduct')
                res.status(202).json(newProduct)
            } catch (error) {
                res.status(500).json(error) 
            }
      
    },

    getAllProduct : async(req,res)=> {
      try {
        const AllProduct = await ProduitModel.find()
        res.status(202).json(AllProduct)
      } catch (error) {
        res.status(500).json(error) 
      }
    },

    AjouternouvelleVariable : async (req,res) => {
      try {
        const GetValue = await ProduitModel.findOne({title: req.params.title})
        // on crée une categorie
        const monObjet = {
          nom: GetValue.title,
          quantite: req.body.quantite,
          Taille: req.body.Taille,
          typologie: req.body.typologie,
          description: req.body.description
        }
        const newCategorie = await CategorieProduct({ProductId: GetValue._id, CategorieProduct: [monObjet]})
        newCategorie.save()

        GetValue.type.push(newCategorie._id)
        GetValue.save()
        res.status(202).json(GetValue)
      } catch (error) {
        res.status(500).json(error) 
      }
    },

    getAllTitle : async (req, res) => {
      try {
        const titleProduct = await ProduitModel.find()
        res.status(202).json(titleProduct)
      } catch (error) {
        res.status(500).json(error) 
      }
    }
}


// etape: On ajoute le type Arandelas ParExemple
// 2: Si le type existe alors