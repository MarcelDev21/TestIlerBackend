const TornilleriaModel = require('../Models/TornilleriaModel')
const DetailRetraitTornilleria = require('../Models/DetailRetraitTornilleria')
const DetailAjoutTornilleria = require('../Models/DetailAjoutTornilleria')
const Favoris = require('../Models/FavorisModel')
const cloudinary = require("cloudinary").v2;
const moment = require('moment')


module.exports={
    RechercheNomProduit : async(req,res) => {
        try {
            const rechercherCategorieProduit = await TornilleriaModel.find({nomProduit: req.body.nomProduit})
            res.status(201).json(rechercherCategorieProduit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    CreerCategorie : async (req,res) => {
        
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Tornilleria"}) 
       
        const newTornilleria = new TornilleriaModel({
            imageProduit: result.secure_url,
            CategorieProduit: req.body.CategorieProduit, // inox o galve
            nomProduit: req.body.nomProduit, // tuercas
            tailleProduit: req.body.tailleProduit, //52
            nomUser: req.body.nomUser,
            quantiteEnStock: req.body.quantiteEnStock,
            dateRetrait: moment(new Date()).format('YYYY-MM-DD'),
        })
        try {
            const nomProduits = await TornilleriaModel.findOne({tailleProduit : req.body.tailleProduit, nomProduit: req.body.nomProduit, CategorieProduit: req.body.CategorieProduit})
            if(nomProduits){
               return res.status(201).json({message: "Vous avez déja ajouté"})
            }
            await newTornilleria.save()
            res.status(201).json(newTornilleria)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    AjouterEnFonctionDeLaDates: async (req,res) => {
        
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')

        try {
           const rechercheId = await TornilleriaModel.findById(req.params.id)
           if(rechercheId.quantiteEnStock === 5){
             return res.status(201).json({message: "Votre produit est inferieur à 5"}) 
           }else{
            //rechercheId.quantiteEnStock - parseInt(req.body.quantiteRetire)

            const DetailRetraits = await DetailRetraitTornilleria.findOne({
                nomUser: req.body.personneQuiAjoute,
                quantiteRetirer: req.body.quantiteRetire, 
                dateRetrait: dateDuJour,
                nomProduit: rechercheId.nomProduit,
                tailleProduit: rechercheId.tailleProduit,
            })

            if(DetailRetraits){
                return res.status(201).json({message: "Vous Avez deja ajouté cet outil"})
            }else{
                const newDetail = await new DetailRetraitTornilleria({
                    nomUser: req.body.personneQuiAjoute,
                    quantiteRetirer: req.body.quantiteRetire,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomProduit,
                    tailleProduit: rechercheId.tailleProduit,
                    CategorieProduit: rechercheId.CategorieProduit,
                })
    
                await newDetail.save()
                await TornilleriaModel.findByIdAndUpdate(rechercheId._id, {$set: {
                    quantiteEnStock: rechercheId.quantiteEnStock - parseInt(req.body.quantiteRetire),
                }}, {new: true})
                rechercheId.DetailRetraitTornilleria.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        }      
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    AjouterMisCompras : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {
            const rechercheId = await TornilleriaModel.findById(req.params.id)
            if(rechercheId){
                const newDetail = await new DetailAjoutTornilleria({
                    nomUser: req.body.personneQuiAjoute,
                    quantiteAjouté: req.body.quantiteAjouté,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomProduit,
                    tailleProduit: rechercheId.tailleProduit,
                    CategorieProduit: rechercheId.CategorieProduit,
                })  
                await newDetail.save()

                await TornilleriaModel.findByIdAndUpdate(rechercheId._id, {$set: {
                    quantiteEnStock: rechercheId.quantiteEnStock + parseInt(req.body.quantiteAjouté),
                }}, {new: true})

                rechercheId.DetailAjoutTornilleria.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },
    

    RecupererTouteMesValeurs : async (req, res) => {
        try {
           const MesRetraits = await DetailRetraitTornilleria.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraits})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    RecupererTouteMesCompras : async (req,res) => {
        try {
            //const MesRetraitsAjout = await DetailAjout.find({nomProduit: "Codo"}).sort({dateRetrait:-1});
            const MesRetraitsAjout = await DetailAjoutTornilleria.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraitsAjout})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    SuppressionNewVersion : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {

            const MesRetraits = await TornilleriaModel.findOne({nomProduit: req.body.nomProduit, tailleProduit:req.body.tailleProduit, CategorieProduit: req.body.CategorieProduit}).populate('DetailRetraitTornilleria')
            const retire = MesRetraits.DetailRetraitTornilleria.find(produit => produit._id.toString() === req.params.id.toString())
            if(retire){
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD')=== dateDuJour){

               const valeur = MesRetraits.DetailRetraitTornilleria.findIndex(produit => produit._id.toString() === req.params.id.toString())
              
               if(valeur !== -1){
                   
                          //ajout des valeurs
                        await TornilleriaModel.findByIdAndUpdate(MesRetraits._id, {$set:{quantiteEnStock: MesRetraits.quantiteEnStock + retire.quantiteRetirer}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailRetraitTornilleria.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailRetraitTornilleria.splice(valeur, 1)
                            MesRetraits.save()
                            return res.status(500).json(MesRetraits) 
                         }
                } else{
                    return res.status(500).json({message:" Cet utilisateur n a pas enrégistré ce produit"}) 
                 }
            }
           // res.status(500).json(MesRetraits)    
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    AjouterTubosDansFavoris : async(req,res) => {
        const RechercheUserFavoris = await Favoris.findOne({userName: req.body.userName })
        try {
            if(RechercheUserFavoris){
                rechercheId = RechercheUserFavoris.FavorisTornilleria.find(cableAuFavoris => cableAuFavoris.equals(req.params.id))
                    if(rechercheId){
                        const retirer = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$pull: {FavorisTornilleria: req.params.id}}, {new:true})  
                        res.status(202).json(retirer)
                        return
                    }else{
                        RechercheUserFavoris.FavorisTornilleria.push(req.params.id)
                        await RechercheUserFavoris.save()
                        res.status(202).json(RechercheUserFavoris)
                        return
                    }
            }else{
                const newUser = new Favoris({userName: req.body.userName})
                await newUser.save()
                const rechercheNewUser = await Favoris.findOne({userName: req.body.userName})
                //
               rechercheNewUser.save()
               rechercheNewUser.FavorisTornilleria.push(req.params.id)
               res.status(202).json(rechercheNewUser)
               return
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    getTubosFavoris : async(req,res) => {
        try {
           // const getTubosFavoris = await Favoris.find({userName:"Landry"}).populate('FavorisTornilleria')
           const getTubosFavoris = await Favoris.find({userName:req.body.userName}).populate('FavorisTornilleria')
            const mesTubos = getTubosFavoris.find(produit => produit)
            //console.log(mesTubos.FavorisTornilleria)
            //res.status(201).json(mesTubos.FavorisTubos)
            res.status(201).json(mesTubos.FavorisTornilleria)
        } catch (error) {
            res.status(400).send("Erreur")
        }
    },

    SupprimerTornillos : async (req, res)=> {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        //console.log(req.body.nomProduit, req.body.tailleProduit, req.body.CategorieProduit)
        try {
            const MesRetraits = await TornilleriaModel.findOne({nomProduit: req.body.nomProduit, tailleProduit:req.body.tailleProduit, CategorieProduit: req.body.CategorieProduit}).populate('DetailAjoutTornilleria')
            const retire = MesRetraits.DetailAjoutTornilleria.find(produit => produit._id.toString() === req.params.id.toString())
       
           // console.log(retire)
          // console.log(retire)
            if(retire){
               
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD') === dateDuJour){

               const valeur = MesRetraits.DetailAjoutTornilleria.findIndex(produit => produit._id.toString() === req.params.id.toString())
              
               if(valeur !== -1){
               
                          //ajout des valeurs
                        await TornilleriaModel.findByIdAndUpdate(MesRetraits._id, {$set:{quantiteEnStock: MesRetraits.quantiteEnStock - parseInt(retire.quantiteAjouté)}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailAjoutTornilleria.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                       
                            MesRetraits.DetailAjoutTornilleria.splice(valeur, 1)
                            MesRetraits.save()
                           
                            return res.status(500).json(MesRetraits) 
                         }
                } else{
                    return res.status(500).json({message:" Cet utilisateur n a pas enrégistré ce produit"}) 
                 }
                }
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    SuppressionNewVersionTornillos : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
       // console.log()
        try {

            const MesRetraits = await TornilleriaModel.findOne({nomProduit: req.body.nomProduit, tailleProduit:req.body.tailleProduit, CategorieProduit:req.body.CategorieProduit}).populate('DetailRetraitTornilleria')
            const retire = MesRetraits.DetailRetraitTornilleria.find(produit => produit._id.toString() === req.params.id.toString())
            //console.log("retire",retire)
            if(retire){
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD')=== dateDuJour){

               const valeur = MesRetraits.DetailRetraitTornilleria.findIndex(produit => produit._id.toString() === req.params.id.toString())
             
               if(valeur !== -1){
                   
                          //ajout des valeurs
                        await TornilleriaModel.findByIdAndUpdate(MesRetraits._id, {$set:{Quantite: MesRetraits.Quantite + retire.quantiteRetirer}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailRetraitTornilleria.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailRetraitTornilleria.splice(valeur, 1)
                            MesRetraits.save()
                            return res.status(500).json(MesRetraits) 
                         }
                } else{
                    return res.status(500).json({message:" Cet utilisateur n a pas enrégistré ce produit"}) 
                 }
            }
           // res.status(500).json(MesRetraits)    
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    AjouterTornilleria : async (req,res) => {
        try {
            const GetValue = await TornilleriaModel.findOne({nomProduit: req.body.nomProduit})
            if(GetValue.tailleProduit === parseInt(req.body.tailleProduit)){
                return res.status(201).json({message: "Ce produit existe"})
            }

            if(req.body.CategorieProduit === "inox" || req.body.CategorieProduit === "galva"){   
                const newTornilleria = new TornilleriaModel({
                    imageProduit: GetValue.imageProduit,
                    CategorieProduit: req.body.CategorieProduit,
                    nomProduit:GetValue.nomProduit,
                    tailleProduit: parseInt(req.body.tailleProduit),
                    nomUser: req.body.nomUser,
                    quantiteEnStock: parseInt(req.body.quantiteEnStock),
                })
    
                await newTornilleria.save()
                return res.status(201).json(newTornilleria)
            }
            return res.status(201).json({message: "Vous devez entrer Inox ou Galva"})
           
           // console.log(GetValue)
           // res.status(201).json(GetValue)
        } catch (error) {
            res.status(500).json(error)   
        }
    },

    AjouternouvelleVariable : async (req,res) => {
        try {
          const GetValue = await TornilleriaModel.findOne({title: req.params.title})
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

}