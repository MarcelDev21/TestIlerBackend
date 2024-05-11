const ProduitModel = require('../Models/ProduitModel')
const cloudinary = require("cloudinary").v2;
const CategorieProductos = require('../Models/CategorieModel')
const RetraitProduit = require('../Models/RetraitProduit')
const moment = require('moment');

// nom de l utilisateur, le produit, la date

module.exports = {
    AddNewProduct : async (req, res) => {
        //65b165bee3927e133be97020
        const newCategorie = new CategorieProductos({ProductId: req.params.id, CategorieProduct:[{
            nom:req.body.nom, 
            quantite:req.body.quantite,
            Taille: req.body.Taille,
            typologie: req.body.typologie,
            description: req.body.description,}] })
        try {
            await newCategorie.save()
            const FindName = await ProduitModel.findOne({title: req.body.nom})   
            FindName.type.push(newCategorie._id)
            FindName.save()
            res.status(202).json(FindName)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    AugmenterProduit : async (req, res) => {
       // console.log("Addition") 65b2c8a3c1dc3e3829835535
        try {
            const getId = await CategorieProductos.findById(req.params.id)
            const Addition = getId.CategorieProduct.find(product => product.quantite)
           // console.log(Addition.quantite)
           // console.log(req.params.quantite)

           const newObject = {
            nom: Addition.nom,
            quantite: parseInt(Addition.quantite) + parseInt(req.params.quantite),
            Taille: Addition.Taille,
            typologie: Addition.typologie,
            description: Addition.description
                }
           //console.log(req.params.id)
           const newVal =  await CategorieProductos.findByIdAndUpdate(req.params.id,{$set: {CategorieProduct : [newObject]}}, {new : true})
            await newVal.save()
           res.status(202).json(newVal)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    EffectuerRetraitProduit : async (req, res) => {
        try {           
               const getValue = await CategorieProductos.findById(req.params.id)
               const recupereNom = await getValue.CategorieProduct.find(product => product.nom)
              

              if(req.params.quantite > recupereNom.quantite){
                res.status(202).json("On ne peut effectuer une grande Operation")
                return
              }

               const newObject = {
                nom: recupereNom.nom,
                quantite:recupereNom.quantite - req.params.quantite,
                Taille:recupereNom.Taille,
                typologie: recupereNom.typologie,
                description: recupereNom.description,
                nomUser: req.params.nomUser,
                DateDuRetrait: new Date()
               }

               const newRetrait = new RetraitProduit({
                nomUtilisateur: recupereNom.nomUser,
                quantiteRetire: req.params.quantite,
               })

               await newRetrait.save()

               const ajoutAuRetrait = await RetraitProduit.findByIdAndUpdate(newRetrait._id, {$set: {produit : [getValue._id]}},  {new: true})
               await ajoutAuRetrait.save()

               console.log("arrions ici")


               const ValueInArray = await CategorieProductos.findByIdAndUpdate(req.params.id, {$set:{CategorieProduct: [newObject]}}, {new: true})
              // console.log(ValueInArray)
              const monObjet = {
                nomUtilisateur: "Antonio",
                produit: ValueInArray._id,
                date : new Date()
              }

              const findNomUtilisateur = await RetraitProduit.findOne({nomUtilisateur: "Antonio"})
              if(findNomUtilisateur){
                console.log("icic")
                findNomUtilisateur.produit.push(ValueInArray._id)
                await findNomUtilisateur.save()
                //res.status(202).json(ValueInArray)
                //res.status().json(findNomUtilisateur)
               // return;
              }else{
                console.log("voila")
                const newRetrait = await new RetraitProduit(monObjet)
                await newRetrait.save()
                //res.status(202).json(ValueInArray)
                //res.status().json(newRetrait)
                //return;
              }

              //console.log("arrice")
              //const newRetrait = await new RetraitProduit(monObjet)
              //await newRetrait.save()
              //console.log("newRetrait", newRetrait)

               await ValueInArray.save()
               res.status(202).json(ValueInArray)
            return
        } catch (error) {
            res.status(500).json(error)
        }
    },

    EffectuerRetraitParNomEtDate : async(req, res) => {
        try {
            const produit = await RetraitProduit.find()
            .sort({nomUtilisateur: 1, date: -1})
            .populate('produit')
            .populate('CablesRetrait')
            .populate('TubosRetrait.MesTubos')
            .populate('TubosRetraits')
           // const CablesRetrait = await RetraitProduit.find().sort({nomUtilisateur: 1, date: -1}).populate('CablesRetrait')
            res.status(202).json(produit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllRetrait : async(req,res) => {
        try {
            
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    EffectuerRetraitProduitUnique : async(req,res) => {
        try {
            const getProductId = await CategorieProductos.findById(req.params.id)
            res.status(202).json(getProductId)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    EnleverProduitRetrait  : async (req,res) =>{
        try {
            //console.log("koloe")
            //const ProduitRetrait = await RetraitProduit.findById(req.params.id)
            //console.log(ProduitRetrait.produit, req.params.newId)

         //const produitAEnlever = await ProduitRetrait.produit.filter(user => user.toString() !== req.params.newId.toString())   
         //console.log("komf",produitAEnlever)
         //res.status(202).json(produitAEnlever)

        /* console.log("entre ossi")

         const ProduitModel = await RetraitProduit.find(req.params.id)
         if(ProduitModel.produit.length === 0){
          
            const ProduitModel = await RetraitProduit.findByIdAndDelete(req.params.id)
            await ProduitModel.save()
            res.status(202).json(ProduitModel)
         }

         const ProduitRetrait = await RetraitProduit.findOneAndUpdate({_id : req.params.id} , {$pull: {produit: req.params.newId}}, {new : true} )
         await ProduitRetrait.save()
         console.log("oussssi")
         console.log(ProduitRetrait)
         res.status(202).json(ProduitRetrait)*/

         const RetraitUser = await RetraitProduit.findOneAndUpdate({nomUtilisateur : req.params.nomUser}, {$pull: {produit: req.params.id}}, {new : true})
         await RetraitUser.save()
         res.status(202).json(RetraitUser)
         //console.log(RetraitUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } ,

    EffectuerRetraitProduitPrecis :async (req,res) => {
        try {
         //console.log(req.params.id)
         let MyArray = []
          const AllCategorie = await CategorieProductos.find()
          for(let i = 0; i<AllCategorie.length ; i++){
            MyArray = AllCategorie[i].CategorieProduct
            //console.log(MyArray)
            for(let j =0; j<MyArray.length; j++){
                if(MyArray[j].nom == "Tuercass"){
                    //console.log("affiche", MyArray[j]._id )
                        if(MyArray[j]._id.toString() === req.params.id.toString()){
                            MyArray[j].quantite = 15
                            console.log("existe", MyArray[j])
                            const updateDb = await CategorieProductos.findOneAndUpdate(CategorieProduct, {$set:{CategorieProduct:[{nom: 'Tuercass',
                            quantite: 15,
                            Taille: 16,
                            typologie: 'inox ',
                            description: 'description',
                            }]}}, {new : true})
                            console.log("MON UP",updateDb)
                        }
                }
            }
          }
          
         
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


// etape: On ajoute le type Arandelas ParExemple
// 2: Si le type existe alors