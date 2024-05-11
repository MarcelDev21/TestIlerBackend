const CableSchema = require('../Models/Cables')
const Favoris = require('../Models/FavorisModel')
const Retrait = require('../Models/RetraitProduit')
const AjoutProduit = require('../Models/AjoutProduit')
const DetailAjoutCable = require('../Models/DetailAjoutCable')
const DetailRetraitCable = require('../Models/DetailRetraitCable')
const cloudinary = require("cloudinary").v2;
const moment = require('moment')


module.exports = {
    AjoutCable : async (req, res) => {
        const {nomCable,nomUser,imageVoiture,cloudinary_id,Dimmension,Taille,Quantite} = req.body;
        //const result = await cloudinary.uploader.upload(req.file.path,{folder: "Cables"});
       // console.log(result)

        const  newCable= await CableSchema({
            nomCable: "Cable Electronique",
            nomUser: "Marcel",
            //imageVoiture: result.secure_url,
           // cloudinary_id: result.public_id,
            Dimmension: Dimmension,
            Taille: Taille,
            Quantite: Quantite
        })
        try {
            const RechercheDimmension = await CableSchema.findOne({Dimmension: Dimmension})
            if(RechercheDimmension){
                res.status(202).json({message: "Cette dimmension est deja accéssible"})
                return
            }

            await newCable.save()
            res.status(201).json(newCable)
            return
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    AjoutAuFavoris : async(req, res) => {
        try {
            
           // req.body.userName
            const RechercheUserFavoris = await Favoris.findOne({userName: "Marcel" })
            console.log("testy", RechercheUserFavoris)
          
            if(RechercheUserFavoris){
               // console.log("votre Recherche")
                //console.log("Ajout Fav", RechercheUserFavoris)
                // on recherche si l id existe dans les favoris
                //const AjoutFavoris = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$set})
               rechercheId = RechercheUserFavoris.FavorisCable.find(cableAuFavoris => cableAuFavoris.equals(req.params.id)) 
               //rechercheId = RechercheUserFavoris.Favoris.find(cableAuFavoris => cableAuFavoris.equals(req.params.id)) 
                    if(rechercheId){
                        //console.log("meme")
                        const retirer = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$pull: {FavorisCable: req.params.id}}, {new:true})   
                       // const retirer = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$pull: {Favoris: req.params.id}}, {new:true})   
                        res.status(202).json(retirer)
                        return
                    }else{
                        // on Ajoute
                        console.log("Ajout", RechercheUserFavoris)
                        RechercheUserFavoris.FavorisCable.push(req.params.id)
                       // RechercheUserFavoris.Favoris.push(req.params.id)
                        await RechercheUserFavoris.save()
                        res.status(202).json(RechercheUserFavoris)
                        return
                    }
            }else{
               
                const newUser = new Favoris({userName: "Marcel"})
               await newUser.save()
               const rechercheNewUser = await Favoris.findOne({userName: "Marcel"})
               //console.log("On arrive ici",rechercheNewUser )
               
               rechercheNewUser.save()
               rechercheNewUser.FavorisCable.push(req.params.id)
               //rechercheNewUser.Favoris.push(req.params.id)
               //console.log("existe pas", rechercheNewUser)
               res.status(202).json(rechercheNewUser)
               return
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },


    getFavoris : async(req,res) => {
        try {
            
            //const getAll = await Favoris.find({userName: "Marcel"}).populate("FavorisCable")
            const getAlls= await Favoris.find({userName: "Marcel"})
            if(getAlls){
               const All = getAlls.find(produit=> produit.toString())
               res.status(201).json(All.FavorisCable);
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },


    getAjoutQuantite : async(req,res) => {
        try {
            const getAlls= await AjoutProduit.find({nomUtilisateur: "Marcel"})
            if(getAlls){
               const All = getAlls.find(produit=> produit.toString())
               res.status(201).json(All.FavorisCable);
            }  
        } catch (error) {
            res.status(500).json({message: error.message}) 
        }
    },

    AjoutQuantite : async(req,res) => {
        try {
           const rechercheProduitAAjouter = await CableSchema.findById(req.params.id)
           //console.log(rechercheProduitAAjouter)
           const newCables = new CableSchema({
            nomCable: rechercheProduitAAjouter.nomCable,
            nomUser: rechercheProduitAAjouter.nomUser,
            Dimmension: rechercheProduitAAjouter.Dimmension,
            Taille: rechercheProduitAAjouter.Taille,
            Quantite: parseInt(rechercheProduitAAjouter.Quantite) + parseInt(req.body.Quantite),
           })
           const RechercherUserRetrait = await AjoutProduit.findOne({nomUtilisateur : "Marcel"})
           if(RechercherUserRetrait){
            //console.log("arrive")
            if(RechercherUserRetrait.AjouterCable.find(produit => produit.toString() === req.params.id.toString())) {
                const retirerQuantite = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: rechercheProduitAAjouter.Quantite + parseInt(req.body.Quantite)}}, {new: true})
                res.status(409).json({message: "Ce Produit n'existe pas", retirerQuantite})
                return
            }else{
                //console.log("n existe pas")
                RechercherUserRetrait.AjouterCable.push(rechercheProduitAAjouter._id)
                await RechercherUserRetrait.save()
                const CableAjout = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: parseInt(rechercheProduitAAjouter.Quantite) + parseInt(req.body.Quantite)}}, {new: true})
                await CableAjout.save()
                res.status(201).json({message:"Ajouter", CableAjout})
                return
            }
           }else{
            // on crée l'ajout
            const newUser = new AjoutProduit({nomUtilisateur: "Marcel"})
            await newUser.save()
            const ajout = await AjoutProduit.findById(newUser._id)
            ajout.AjouterCable.push(rechercheProduitAAjouter._id)

            const CableAjout = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: parseInt(rechercheProduitAAjouter.Quantite) + parseInt(req.body.Quantite)}}, {new: true})
            await CableAjout.save()
            res.status(201).json({message:"effectuer",CableAjout})
           }

           /*if(rechercheProduitAAjouter){
            const CableAjout = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: parseInt(rechercheProduitAAjouter.Quantite) + parseInt(req.body.Quantite)}}, {new: true})
            await CableAjout.save()
            res.status(201).json(CableAjout)
           }*/
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    AjoutAmisComprasCables : async (req, res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {
            const rechercheId = await CableSchema.findById(req.params.id)
            console.log(rechercheId)
            if(rechercheId){
                const newDetail = await new DetailAjoutCable({
                    nomUser: req.body.nomUser,
                    quantiteAjouté: req.body.quantiteAjouté,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomCable,
                    tailleProduit: rechercheId.Dimmension,
                })  
                await newDetail.save()

                await CableSchema.findByIdAndUpdate(rechercheId._id, {$set: {
                    Quantite: parseInt(rechercheId.Quantite )+ parseInt(req.body.quantiteAjouté),
                }}, {new: true})

                rechercheId.DetailAjoutCable.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    AjouterEnFonctionDeLaDates : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')

        try {
           const rechercheId = await CableSchema.findById(req.params.id)
           if(rechercheId.Quantite === 5){
             return res.status(201).json({message: "Votre produit est inferieur à 5"}) 
           }else{
            //rechercheId.quantiteEnStock - parseInt(req.body.quantiteRetire)

            const DetailRetraits = await DetailRetraitCable.findOne({
                nomUser: req.body.personneQuiAjoute,
                //quantiteRetirer: req.body.quantiteRetirer, 
                dateRetrait: dateDuJour,
                //nomProduit: rechercheId.nomCable,
                tailleProduit: rechercheId.Dimmension,
            })
            console.log(DetailRetraits)

            if(DetailRetraits){
                return res.status(201).json({message: "Vous Avez deja ajouté cet outil"})
            }else{
                const newDetail = await new DetailRetraitCable({
                    nomUser: req.body.personneQuiAjoute,
                    quantiteRetirer: req.body.quantiteRetirer,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomCable,
                    tailleProduit: rechercheId.Dimmension,
                })
    
                await newDetail.save()
                await CableSchema.findByIdAndUpdate(rechercheId._id, {$set: {
                    Quantite: rechercheId.Quantite - parseInt(req.body.quantiteRetirer),
                }}, {new: true})
                
                rechercheId.DetailRetraitCable.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        }      
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    RecupererTouteMesValeurs : async (req,res) => {
        try {
           const MesRetraits = await DetailRetraitCable.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraits})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    SuppressionNewVersionCable : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        console.log()
        try {

            const MesRetraits = await CableSchema.findOne({nomCable: req.body.nomProduit, Dimmension:req.body.tailleProduit}).populate('DetailRetraitCable')
            const retire = MesRetraits.DetailRetraitCable.find(produit => produit._id.toString() === req.params.id.toString())
            //console.log("retire",retire)
            if(retire){
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD')=== dateDuJour){

               const valeur = MesRetraits.DetailRetraitCable.findIndex(produit => produit._id.toString() === req.params.id.toString())
             
               if(valeur !== -1){
                   
                          //ajout des valeurs
                        await CableSchema.findByIdAndUpdate(MesRetraits._id, {$set:{Quantite: MesRetraits.Quantite + retire.quantiteRetirer}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailRetraitCable.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailRetraitCable.splice(valeur, 1)
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

    SuppressionMisCompras : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
       
        
        try {
            const MesRetraits = await CableSchema.findOne({nomCable: req.body.nomProduit, Dimmension:req.body.tailleProduit}).populate('DetailAjoutCable')
            const retire = MesRetraits.DetailAjoutCable.find(produit => produit._id.toString() === req.params.id.toString())
            console.log(req.params.id, retire)
            if(retire){
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD') === dateDuJour){

               const valeur = MesRetraits.DetailAjoutCable.findIndex(produit => produit._id.toString() === req.params.id.toString())
           
               if(valeur !== -1){
               
                          //ajout des valeurs
                        await CableSchema.findByIdAndUpdate(MesRetraits._id, {$set:{Quantite: MesRetraits.Quantite - parseInt(retire.quantiteAjouté)}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailAjoutCable.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailAjoutCable.splice(valeur, 1)
                            MesRetraits.save()
                            return res.status(500).json(MesRetraits) 
                         }
                } else{
                    console.log("no",retire)
                    return res.status(500).json({message:" Cet utilisateur n a pas enrégistré ce produit"}) 
                 }
                }
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    RecupererTouteMesComprasCables : async (req,res) => {
        try {
            //const MesRetraitsAjout = await DetailAjout.find({nomProduit: "Codo"}).sort({dateRetrait:-1});
            const MesRetraitsAjout = await DetailAjoutCable.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraitsAjout})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    RetirerQuantite : async (req, res) => {
        try {
            const rechercheProduitAAjouter = await CableSchema.findById(req.params.id)
            if(rechercheProduitAAjouter.Quantite < 5){
                res.status(201).json({message: "La quantité est insuffisante"})
                return
            }

            if(req.body.Quantite > rechercheProduitAAjouter.Quantite){
                res.status(201).json({message: "La quantité entrée est supérieure a celle que nous avons"})
                return
            }

            const RecherUserRetrait = await Retrait.findOne({nomUtilisateur: rechercheProduitAAjouter.nomUser})
            if(RecherUserRetrait){
                // si l id du cable existe deja dans les produits
                    if(RecherUserRetrait.produit.find(produit => produit.toString()  === rechercheProduitAAjouter._id.toString())){
                        res.status(201).json({message:"Vous avez deja ajouter ce Cable"})
                    }else{
                        // on ajoute
                     const Ajter =   await Retrait.findByIdAndUpdate({nomUtilisateur: rechercheProduitAAjouter.nomUser}, {$set: {produit:RecherUserRetrait.produit.push(RecherUserRetrait._id)}}, {new: true})
                        await Ajter.save()
                        res.status(201).json(Ajter)
                    }
            }else{
                // on ajoute
                const newProduit = new Retrait({
                    nomUser: rechercheProduitAAjouter.nomUser
                })
                await newProduit.save()
               const donneAAjouter = await Retrait.findById(newProduit._id)
               const ValeurAjouter =  await Retrait.findByIdAndUpdate(donneAAjouter._id, {$set:{produit:donneAAjouter.produit.push(rechercheProduitAAjouter._id)}})
               await ValeurAjouter.save()
               res.status(201).json(ValeurAjouter)
            }


            const CableAjout = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: parseInt(rechercheProduitAAjouter.nomCable) - parseInt(req.body.Quantite)}}, {new: true})
            await CableAjout.save()
            res.status(201).json(CableAjout)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    RetirerMonProduit : async (req,res) => {
        try {
          const rechercehProduit = await CableSchema.findById(req.params.id) 
          if(rechercehProduit.nomUser === req.body.nomUser){
                if(rechercehProduit.Quantite  <= 5){
                    res.status(409).json({message: "Nous n'avons plus que 5 en stock"})
                    return
                }
                if(req.body.Quantite > rechercehProduit.Quantite ){
                    res.status(409).json({message: "Nous n'aurons pas cette valeur en stock"})
                    return
                }

                if(req.body.Quantite === rechercehProduit.Quantite ){
                    res.status(409).json({message: "Le Stock sera bientot vide"})
                    return
                }

                    const RechercherUserRetrait = await Retrait.findOne({nomUtilisateur : req.body.nomUser})
                   
                    if(RechercherUserRetrait){                   
                        //  on verifie si le produit que je veux ajouter est deja dans les cables
                        if(RechercherUserRetrait.CablesRetrait.find(produit => produit.toString() === req.params.id.toString())) {
                            const retirerQuantite = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: rechercehProduit.Quantite - parseInt(req.body.Quantite), QuantiteDemande: parseInt(req.body.Quantite)}}, {new: true})
                            res.status(409).json({message: "Ce Produit n'existe pas", retirerQuantite})
                            return
                        }else{
                            //console.log("n existe pas")
                            RechercherUserRetrait.CablesRetrait.push(rechercehProduit._id)
                            await RechercherUserRetrait.save()
                            const retirerQuantite = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: rechercehProduit.Quantite - parseInt(req.body.Quantite), QuantiteDemande: parseInt(req.body.Quantite)}}, {new: true})
                            res.status(202).json({message: "Ce produit existe",retirerQuantite})
                            return
                        }
                    }else{
                           // console.log("Yoro")
                            const newRetrait = new Retrait({
                                nomUtilisateur: req.body.nomUser,
                            })

                        await newRetrait.save()
                        // const addCableRetrait = await Retrait.findByIdAndUpdate(newRetrait._id, {$set:{CablesRetrait: newRetrait.CablesRetrait.push(rechercehProduit._id)}}, {new: true})
                        newRetrait.CablesRetrait.push(rechercehProduit._id)
                        await newRetrait.save()
                        const retirerQuantite = await CableSchema.findByIdAndUpdate(req.params.id, {$set: {Quantite: rechercehProduit.Quantite - parseInt(req.body.Quantite), QuantiteDemande: parseInt(req.body.Quantite)}}, {new: true})
                        res.status(202).json({newRetrait,retirerQuantite})
                        return        
                    }
          }else{
            res.status(202).json({message: "Votre Identifiant n'existe pas"})
          }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    getCables : async (req,res) => {
        try {
            const getAllCables = await CableSchema.find()
            res.status(201).json(getAllCables);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}