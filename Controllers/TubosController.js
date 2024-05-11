const TubosSchema = require('../Models/Tubos')
const RetraitProduit = require('../Models/RetraitProduit')
const CablesRetrait = require('../Models/Cables')
const Favoris = require('../Models/FavorisModel')
const DetailRetrait = require('../Models/DetailRetrait')
const DetailAjout = require('../Models/DetailAjout')
const cloudinary = require("cloudinary").v2;
const moment = require('moment');


module.exports = {
    CreerCategorie : async (req,res) => {
        const {CategorieProduit, nomProduit, tailleProduit, nomUser,quantiteEnStock,dateRetrait} = req.body
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Tubos"}) 
       // console.log(result)
        const laDate = moment(new Date())
       // console.log(laDate.format('YYYY-MM-DD'))
        const newCategorieTubos = new TubosSchema({
            imageProduit: result.secure_url,
            CategorieProduit: CategorieProduit,
            nomProduit,
            tailleProduit,
            nomUser,
            quantiteEnStock,
            dateRetrait : moment(new Date()).format('YYYY-MM-DD'),
        })
        try {
           // const tailleProduitExist = await TubosSchema.findOne({tailleProduit})
           /* if(tailleProduitExist){
                res.status(202).json({message: "Ce produit existe déja"})
                return
            }*/
            const nomProduits = await TubosSchema.findOne({tailleProduit : tailleProduit, nomProduit: nomProduit})
            if(nomProduits){
               return res.status(201).json({message: "Vous avez déja ajouté"})
            }
           // console.log("tailleProduit")
            await newCategorieTubos.save()
            res.status(201).json(newCategorieTubos)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    CreerCategorieDesaigua : async (req,res) => {
        const {CategorieProduit, nomProduit, tailleProduit, nomUser,quantiteEnStock,dateRetrait} = req.body
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Desagua"}) 

        const newCategorieTubos = new TubosSchema({
            imageProduit: result.secure_url,
            CategorieProduit: CategorieProduit,
            nomProduit,
            tailleProduit,
            nomUser,
            quantiteEnStock,
            dateRetrait : moment(new Date()).format('YYYY-MM-DD'),
        })
        try {
            const nomProduits = await TubosSchema.findOne({tailleProduit : tailleProduit, nomProduit: nomProduit, CategorieProduit: CategorieProduit})
            if(nomProduits){
               return res.status(201).json({message: "Vous avez déja ajouté"})
            }
            await newCategorieTubos.save()
            res.status(201).json(newCategorieTubos)
        } catch (error) {
            res.status(500).json(error) 
        }
    },


    CreerCategoriePoliEtileno : async (req,res) => {
        const {CategorieProduit, nomProduit, tailleProduit, nomUser,quantiteEnStock,dateRetrait} = req.body
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "PoliEtileno"}) 

        const newCategorieTubos = new TubosSchema({
            imageProduit: result.secure_url,
            CategorieProduit: CategorieProduit,
            nomProduit,
            tailleProduit,
            nomUser,
            quantiteEnStock,
            dateRetrait : moment(new Date()).format('YYYY-MM-DD'),
        })
        try {
            const nomProduits = await TubosSchema.findOne({tailleProduit : tailleProduit, nomProduit: nomProduit, CategorieProduit: CategorieProduit})
            if(nomProduits){
               return res.status(201).json({message: "Vous avez déja ajouté"})
            }
            await newCategorieTubos.save()
            res.status(201).json(newCategorieTubos)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    CreerCategorieFlexible : async (req,res) => {
        const {CategorieProduit, nomProduit, tailleProduit, nomUser,quantiteEnStock,dateRetrait} = req.body
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Flexible"}) 

        const newCategorieTubos = new TubosSchema({
            imageProduit: result.secure_url,
            CategorieProduit: CategorieProduit,
            nomProduit,
            tailleProduit,
            nomUser,
            quantiteEnStock,
            dateRetrait : moment(new Date()).format('YYYY-MM-DD'),
        })
        try {
            const nomProduits = await TubosSchema.findOne({tailleProduit : tailleProduit, nomProduit: nomProduit, CategorieProduit: CategorieProduit})
            if(nomProduits){
               return res.status(201).json({message: "Vous avez déja ajouté"})
            }
            await newCategorieTubos.save()
            res.status(201).json(newCategorieTubos)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    CreerPvc : async (req,res) => {
        try {
            const rechercherImage = await TubosSchema.findOne({CategorieProduit: "Pvc", nomProduit: req.body.nomProduit})
            //console.log(rechercherImage)
            const recherchePvc = await TubosSchema.findOne({CategorieProduit: rechercherImage.CategorieProduit, nomProduit: req.body.nomProduit, tailleProduit: req.body.tailleProduit})
            if(recherchePvc){
                return res.status(201).json({message: "Ce Produit existe déja"})
            }else{
                const newPvc = new TubosSchema({
                    imageProduit: rechercherImage.imageProduit,
                    CategorieProduit: rechercherImage.CategorieProduit,
                    nomProduit : req.body.nomProduit,
                    tailleProduit: req.body.tailleProduit,
                    nomUser: req.body.nomUser,
                    quantiteEnStock: req.body.quantiteEnStock,
                    dateRetrait: moment(new Date()).format('YYYY-MM-DD'),
                })
                await newPvc.save()
                res.status(201).json(newPvc) 
            }
           // console.log(rechercherImage.imageProduit)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    CreerDesaigua : async (req,res) => {
        try {
            const rechercherImage = await TubosSchema.findOne({CategorieProduit: "Desaigua", nomProduit: req.body.nomProduit})
            const recherchePvc = await TubosSchema.findOne({CategorieProduit: rechercherImage.CategorieProduit, nomProduit: req.body.nomProduit, tailleProduit: req.body.tailleProduit})
            if(recherchePvc){
                return res.status(201).json({message: "Ce Produit existe déja"})
            }else{
                const newPvc = new TubosSchema({
                    imageProduit: rechercherImage.imageProduit,
                    CategorieProduit: rechercherImage.CategorieProduit,
                    nomProduit : req.body.nomProduit,
                    tailleProduit: req.body.tailleProduit,
                    nomUser: req.body.nomUser,
                    quantiteEnStock: req.body.quantiteEnStock,
                    dateRetrait: moment(new Date()).format('YYYY-MM-DD'),
                })
                await newPvc.save()
                res.status(201).json(newPvc) 
            }
           // console.log(rechercherImage.imageProduit)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    crearPolietileno : async (req, res) => {
        try {
            const rechercherImage = await TubosSchema.findOne({CategorieProduit: "Polietileno", nomProduit: req.body.nomProduit})
            const recherchePvc = await TubosSchema.findOne({CategorieProduit: rechercherImage.CategorieProduit, nomProduit: req.body.nomProduit, tailleProduit: req.body.tailleProduit})
            if(recherchePvc){
                return res.status(201).json({message: "Ce Produit existe déja"})
            }else{
                const newPvc = new TubosSchema({
                    imageProduit: rechercherImage.imageProduit,
                    CategorieProduit: rechercherImage.CategorieProduit,
                    nomProduit : req.body.nomProduit,
                    tailleProduit: req.body.tailleProduit,
                    nomUser: req.body.nomUser,
                    quantiteEnStock: req.body.quantiteEnStock,
                    dateRetrait: moment(new Date()).format('YYYY-MM-DD'),
                })
                await newPvc.save()
                res.status(201).json(newPvc) 
            }
           // console.log(rechercherImage.imageProduit)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    crearFlexibles : async (req, res) => {
        try {
            const rechercherImage = await TubosSchema.findOne({CategorieProduit: "Flexibles", nomProduit: req.body.nomProduit})
            const recherchePvc = await TubosSchema.findOne({CategorieProduit: rechercherImage.CategorieProduit, nomProduit: req.body.nomProduit, tailleProduit: req.body.tailleProduit})
            if(recherchePvc){
                return res.status(201).json({message: "Ce Produit existe déja"})
            }else{
                const newPvc = new TubosSchema({
                    imageProduit: rechercherImage.imageProduit,
                    CategorieProduit: rechercherImage.CategorieProduit,
                    nomProduit : req.body.nomProduit,
                    tailleProduit: req.body.tailleProduit,
                    nomUser: req.body.nomUser,
                    quantiteEnStock: req.body.quantiteEnStock,
                    dateRetrait: moment(new Date()).format('YYYY-MM-DD'),
                })
                await newPvc.save()
                res.status(201).json(newPvc) 
            }
           // console.log(rechercherImage.imageProduit)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    RecherchePvc : async(req,res) => {
        try {
            const rechercherCategorieProduit = await TubosSchema.find({CategorieProduit: req.body.CategorieProduit})
            res.status(201).json(rechercherCategorieProduit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    RechercheNomProduit : async(req,res) => {
        try {
            const rechercherCategorieProduit = await TubosSchema.find({nomProduit: req.body.nomProduit})
            res.status(201).json(rechercherCategorieProduit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    RechercheNomDesagua : async(req,res) => {
        try {
            const rechercherCategorieProduit = await TubosSchema.find({nomProduit: req.body.nomProduit, CategorieProduit: req.body.CategorieProduit })
            res.status(201).json(rechercherCategorieProduit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    RechercheNomFlexibles : async(req,res) => {
        try {
           const getFlexibles = await TubosSchema.find({nomProduit: req.body.nomProduit, CategorieProduit: "Flexibles"})
           res.status(201).json(getFlexibles)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    RechercheNomPoliEtileno : async(req,res) => {
        try {
            const rechercherCategorieProduit = await TubosSchema.find({nomProduit:req.body.nomProduit, CategorieProduit: "Polietileno"})
            res.status(201).json(rechercherCategorieProduit)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    AfficherNomProduit : async(req,res) => {
        const {nomProduit} = req.body
       try {
         const rechercheNomProduit = await TubosSchema.find(nomProduit).sort({ date: 1 })
         if(!rechercheNomProduit){
            res.status(202).json({message: "Ce produit n existe pas"})
         }
         res.status(200).json(rechercheNomProduit)
       } catch (error) {
         res.status(500).json(error)
       }
    },

    RetirerProduit : async (req,res) => {
        const {date} = req.body
        try {
            // il nous faut l id du produit et on recherche la quantite
            const rechercheUserId = await TubosSchema.findById(req.params.id)
            //console.log(rechercheUserId)
            if(rechercheUserId){
             await TubosSchema.findByIdAndUpdate(rechercheUserId._id, {$set: {
                quantiteEnStock:rechercheUserId.quantiteEnStock - parseInt(req.body.quantiteAretirer),
            }}, {new: true})

            await TubosSchema.findByIdAndUpdate(rechercheUserId._id, {$push: {
                quantiteARetierer: rechercheUserId.quantiteARetierer.push({nomUtilisateur: rechercheUserId.nomUser, quantiteARetirer: parseInt(req.body.quantiteAretirer), dateduretrait: moment(new Date()).format('YYYY-MM-DD')})
            }})
            await rechercheUserId.save()
            res.status(201). json({message:"bine", rechercheUserId})
            }else{
               // console.log("koong")
                res.status(202).json({message: "Cet id n existe pas"})  
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },


    // cette methode marche correctement
    RetirerProduitEnFonctionDate : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD');
        try {
          const getTubos = await TubosSchema.findById(req.params.id)  
         // getTubos.quantiteARetierer.push({dateRetrait: dateDuJour, nomUser: req.body.nomUser, quantiteRetirer: req.body.retirer})
        if(getTubos.quantiteARetierer.find(produit => produit.dateRetrait === dateDuJour && produit.nomUser === req.body.nomUser)){
            console.log("on supprime")
            const valeur = getTubos.quantiteARetierer.find(produit => produit.dateRetrait === dateDuJour && produit.nomUser === req.body.nomUser)
            await TubosSchema.findByIdAndUpdate(getTubos._id, {$set: {quantiteEnStock: getTubos.quantiteEnStock + parseInt(valeur.quantiteRetirer)}}, {new: true})
            await TubosSchema.findByIdAndUpdate(getTubos._id, {$pull:{quantiteARetierer: {dateRetrait: valeur.dateRetrait, nomUser: valeur.nomUser, quantiteRetirer: valeur.quantiteRetirer}}}, {new: true})
            await getTubos.save()
            return res.status(201).json({message:"Suppression effectuée avec succès", getTubos})
        }else{
        //    console.log("on ajoute")
            await TubosSchema.findByIdAndUpdate(getTubos._id, {$set: {quantiteEnStock: getTubos.quantiteEnStock - req.body.retirer}}, {new: true})
            await TubosSchema.findByIdAndUpdate(getTubos._id,{$push: {quantiteARetierer: getTubos.quantiteARetierer.push({dateRetrait: dateDuJour, nomUser: req.body.nomUser, quantiteRetirer: req.body.retirer})}}, {new: true})
            //await TubosSchema.findByIdAndUpdate(getTubos._id, {$push: {quantiteARetierer: getTubos.quantiteARetierer.push({nomUser: req.body.nomUser, quantiteRetirer: parseInt(req.body.retirer), dateRetrait: dateDuJour})}}) 
            await getTubos.save()
            return res.status(201).json({message:"Ajout effectué avec succès", getTubos})
          }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    AjouterMisCompras : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {
            const rechercheId = await TubosSchema.findById(req.params.id)
            if(rechercheId){
                const newDetail = await new DetailAjout({
                    nomUser: req.body.personneQuiAjoute,
                    quantiteAjouté: req.body.quantiteAjouté,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomProduit,
                    tailleProduit: rechercheId.tailleProduit,
                    CategorieProduit: rechercheId.CategorieProduit,
                })  
                await newDetail.save()

                await TubosSchema.findByIdAndUpdate(rechercheId._id, {$set: {
                    quantiteEnStock: rechercheId.quantiteEnStock + parseInt(req.body.quantiteAjouté),
                }}, {new: true})

                rechercheId.DetailAjout.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

     RecupererTouteMesCompras : async (req,res) => {
        try {
            //const MesRetraitsAjout = await DetailAjout.find({nomProduit: "Codo"}).sort({dateRetrait:-1});
            const MesRetraitsAjout = await DetailAjout.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraitsAjout})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    AjouterEnFonctionDeLaDates: async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')

        try {
           const rechercheId = await TubosSchema.findById(req.params.id)
           if(rechercheId.quantiteEnStock === 5){
             return res.status(201).json({message: "Votre produit est inferieur à 5"}) 
           }else{
            //rechercheId.quantiteEnStock - parseInt(req.body.quantiteRetire)

            const DetailRetraits = await DetailRetrait.findOne({
                nomUser: req.body.personneQuiAjoute,
                quantiteRetirer: req.body.quantiteRetire, 
                dateRetrait: dateDuJour,
                nomProduit: rechercheId.nomProduit,
                tailleProduit: rechercheId.tailleProduit,
            })

            if(DetailRetraits){
                return res.status(201).json({message: "Vous Avez deja ajouté cet outil"})
            }else{
                const newDetail = await new DetailRetrait({
                    nomUser: req.body.personneQuiAjoute,
                    quantiteRetirer: req.body.quantiteRetire,
                    dateRetrait: dateDuJour,
                    nomProduit: rechercheId.nomProduit,
                    tailleProduit: rechercheId.tailleProduit,
                    CategorieProduit: rechercheId.CategorieProduit,
                })
    
                await newDetail.save()
                await TubosSchema.findByIdAndUpdate(rechercheId._id, {$set: {
                    quantiteEnStock: rechercheId.quantiteEnStock - parseInt(req.body.quantiteRetire),
                }}, {new: true})
                
                rechercheId.DetailRetrait.push(newDetail._id)
                await rechercheId.save()
                return res.status(201).json({message: "Effectuée avec succès", rechercheId})
            }
        }      
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    RecupererTouteMesValeurs : async (req, res) => {
        // a revoir
        try {
            //const MesRetraits = await TubosSchema.find({nomProduit: "Codo"}).populate('DetailRetrait')
            //.sort({ date: 1 })
           //const misProductos =  MesRetraits.find(produit => produit._id)
           //const MesRetraits = await DetailRetrait.find({nomProduit: "Codo"}).sort({dateRetrait:-1});
           const MesRetraits = await DetailRetrait.find().sort({dateRetrait:-1});
            res.status(201).json({message: "Mes Retraits", MesRetraits})
        } catch (error) {
            res.status(500).json(error)  
        }
    },

    SuppressionMisCompras : async (req, res)=> {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {
            const MesRetraits = await TubosSchema.findOne({nomProduit: req.body.nomProduit, tailleProduit:req.body.tailleProduit, CategorieProduit: req.body.CategorieProduit}).populate('DetailAjout')
            const retire = MesRetraits.DetailAjout.find(produit => produit._id.toString() === req.params.id.toString())
       
            console.log(MesRetraits)

            if(retire){
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD') === dateDuJour){

               const valeur = MesRetraits.DetailAjout.findIndex(produit => produit._id.toString() === req.params.id.toString())
             
               if(valeur !== -1){
                   
                          //ajout des valeurs
                        await TubosSchema.findByIdAndUpdate(MesRetraits._id, {$set:{quantiteEnStock: MesRetraits.quantiteEnStock - parseInt(retire.quantiteAjouté)}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailAjout.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailAjout.splice(valeur, 1)
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

    SuppressionNewVersion : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {

            const MesRetraits = await TubosSchema.findOne({nomProduit: req.body.nomProduit, tailleProduit:req.body.tailleProduit, CategorieProduit: req.body.CategorieProduit}).populate('DetailRetrait')
            const retire = MesRetraits.DetailRetrait.find(produit => produit._id.toString() === req.params.id.toString())
            console.log("retire",MesRetraits)
            if(retire){
                // on va verifier si le nomUser est aussi le meme
                   if(retire.nomUser === req.body.nomUser && moment(new Date(retire.dateRetrait)).format('YYYY-MM-DD')=== dateDuJour){

               const valeur = MesRetraits.DetailRetrait.findIndex(produit => produit._id.toString() === req.params.id.toString())
             
               if(valeur !== -1){
                   
                          //ajout des valeurs
                        await TubosSchema.findByIdAndUpdate(MesRetraits._id, {$set:{quantiteEnStock: MesRetraits.quantiteEnStock + retire.quantiteRetirer}},{new: true})
                        await MesRetraits.save()

                        // supprimer l'identifiant dans les retraits
                        await DetailRetrait.findByIdAndDelete(req.params.id)
                        //await deleteId.save()
                    
                            MesRetraits.DetailRetrait.splice(valeur, 1)
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

    AjouterEnFonctionDeLaDate : async(req,res)=> {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {   
            const getTubos = await TubosSchema.findById(req.params.id)  
            const mesDatas = getTubos.quantiteARetierer.find(produit =>  produit)
            if(getTubos.quantiteARetierer.find(produit => produit.nomUser === req.body.nomUser && moment(new Date(produit.dateRetrait)).format('YYYY-MM-DD') === dateDuJour ) ){
                //console.log("suppre")
                return res.status(201).json({message:"Vous ne pouvez plus enregistrer de produit à la date d'aujourdhui"})
            }else{
               //console.log("Ajout", getTubos)
                await TubosSchema.findByIdAndUpdate(getTubos._id, {$set: {quantiteEnStock: getTubos.quantiteEnStock - parseInt(req.body.retirer)}}, {new: true})
                const affect = await TubosSchema.findById(getTubos._id)
                affect.quantiteARetierer.push({
                    nomUser:req.body.nomUser, 
                    quantiteRetirer:parseInt(req.body.retirer), 
                    dateRetrait: dateDuJour,
                    nomProduit: getTubos.nomProduit,
                    tailleProduit: getTubos.tailleProduit,
                    CategorieProduit: getTubos.CategorieProduit
                })
                await affect.save()

                const getTubitos = await RetraitProduit.find()
                const addRetrait = new RetraitProduit({nomUtilisateur: req.body.nomUser})
                await addRetrait.save()
                addRetrait.TubosRetraits.push(getTubos._id)
                await addRetrait.save()

                return  res.status(201).json({message:"bon enregistrement",getTubos, affect})
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    AugmenterQuantiteEnStockTubos : async (req,res) => {
        const dateDuJour = moment(new Date()).format('YYYY-MM-DD')
        try {
            const getTubos = await TubosSchema.findById(req.params.id) 
            if(getTubos.quantiteTubosAEnregistrer.find(produit => produit.nomUser === req.body.nomUser && moment(new Date(produit.dateRetrait)).format('YYYY-MM-DD') === dateDuJour)){
                return res.status(201).json({message:"Vous avez déja éffectué un ajout de ce produit"}) 
            }else{
                await TubosSchema.findByIdAndUpdate(getTubos._id, {$set:{quantiteEnStock: getTubos.quantiteEnStock + parseInt(req.body.Ajouter)}}, {new: true})
                const Ajouter = await TubosSchema.findById(getTubos._id)
                Ajouter.quantiteTubosAEnregistrer.push({
                    nomUser:req.body.nomUser, 
                    quantiteAjouté:parseInt(req.body.Ajouter), 
                    dateRetrait: dateDuJour,
                    nomProduit: getTubos.nomProduit,
                    tailleProduit: getTubos.tailleProduit,
                    CategorieProduit: getTubos.CategorieProduit
                })
                await Ajouter.save()
                return  res.status(201).json({message:"bon enregistrement",getTubos, Ajouter})
            }
           // console.log(getTubos)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    getAllMisTubos : async (req,res) => {
        try {
           const getAllTubos = await TubosSchema.find()
           const toutesLesDates = [];

            // Parcourir chaque document et extraire toutes les dates de retrait
             getAllTubos.forEach(document => {
            document.quantiteARetierer.forEach(quantiteARetirer => {
                //.dateRetrait
                toutesLesDates.push(quantiteARetirer);
            });
            });
            toutesLesDates.sort((a, b) => b.dateRetrait - a.dateRetrait);

            res.status(201).json(toutesLesDates)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    getTubosAEnregistrer : async (req,res) => {
        try {
            const getAllTubos = await TubosSchema.find()
            const toutesLesDates = [];

             getAllTubos.forEach(document => {
             document.quantiteTubosAEnregistrer.forEach(quantiteTubosAEnregistrer => {
                 toutesLesDates.push(quantiteTubosAEnregistrer);
             });
             });
             toutesLesDates.sort((a, b) => b.dateRetrait - a.dateRetrait);
 
             res.status(201).json(toutesLesDates)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    SuppressionValue : async (req,res)=> {
        try {
            const dateDuJour = moment(new Date()).format('YYYY-MM-DD')

            const affiche = getAllTubos.quantiteARetierer.find(tubos => moment(new Date(tubos.dateRetrait)).format('YYYY-MM-DD') === dateDuJour && tubos.nomUser === req.body.nomUser)
            console.log("kolo", getAllTubos)
            if(affiche){
                console.log("kong")   
                //getAllTubos.quantiteEnStock += affiche.quantiteRetirer
                await getAllTubos.save()

                //const suppression = await TubosSchema.findOneAndUpdate(getAllTubos._id, {$pull: {quantiteARetierer:{_id:  req.params.id}}}, {new: true})
                const suppression = await TubosSchema.findByIdAndUpdate(getAllTubos._id, {$pull: {quantiteARetierer:{_id:  req.params.id}}}, {new: true})
                await suppression.save()

                return res.status(201).json({message: "succes", suppression})
            }else{
                return res.status(201).json({message: "suppression difficile"})
            }
             res.status(201).json(affiche)
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    SuppressionCompras  : async (req, res)=>{
        try {
            const getAllTubos = await TubosSchema.findOne({nomProduit: req.body.nomProduit})
            const dateDuJour = moment(new Date()).format('YYYY-MM-DD')

            const affiche = getAllTubos.quantiteTubosAEnregistrer.find(tubos => moment(new Date(tubos.dateRetrait)).format('YYYY-MM-DD') === dateDuJour && tubos.nomUser === req.body.nomUser)
            
            if(affiche){
               // console.log("effectuer suppression", getAllTubos._id )
                const suppression = await TubosSchema.findOneAndUpdate(getAllTubos._id, {$pull: {quantiteTubosAEnregistrer:{_id:  req.params.id}}}, {new: true})
                await suppression.save()
                return res.status(201).json({message: "succes test", suppression})
            }
             res.status(201).json(affiche)
        } catch (error) {
            res.status(500).json(error) 
        }
    },



    AjouterDansRetrait :async (req,res) => {
              //const dateduRetrait = moment(MesRtraits.dateRetrait).format('YYYY-MM-DD')
             //const dateduRecu = moment(new Date(req.body.date)).format('YYYY-MM-DD')
        try {
           // Boungui a ajouté un produit dans les retraits aujourdhui.
           const newRetrait = new RetraitProduit({
            nomUtilisateur: req.body.nomUtilisateur,
            date: moment(new Date()).format('YYYY-MM-DD')
            })

           const dateduJour = moment(new Date()).format('YYYY-MM-DD');
           const dateAujourdhui = await RetraitProduit.find({date: dateduJour})

           if(dateAujourdhui.length === 0){

           const verifierIdEnTubos = await TubosSchema.findById(req.params.id);
           const valeur = verifierIdEnTubos.quantiteARetierer[verifierIdEnTubos.quantiteARetierer.length - 1]
           console.log(valeur.quantiteARetirer)

           if(verifierIdEnTubos){
            await newRetrait.save()
            newRetrait.TubosRetrait.push({MesTubos: req.params.id, dateRetrait: new Date()})
            await newRetrait.save()
            res.status(201).json({message: "L'OBJET A BIEN ETE ENREGISTRE", newRetrait})  
            return      
           }

           }else{
            const AllRetrait = await RetraitProduit.findOne({nomUtilisateur: req.body.nomUtilisateur})
           // const AllRetrait = await RetraitProduit.find({nomUtilisateur: req.body.nomUtilisateur})
           // console.log("le nom", AllRetrait)
            if(AllRetrait === null){
                const newObjet = new RetraitProduit({
                    nomUtilisateur: req.body.nomUtilisateur,
                    date: moment(new Date()).format('YYYY-MM-DD')
                })
                await newObjet.save()
                newObjet.TubosRetrait.push({MesTubos: req.params.id})
                await newObjet.save();
               return res.status(201).json({message:"Ajouter", newObjet})
            }
            
           const valeur = dateAujourdhui.find(produit => produit)
           const tubosExistant = valeur.TubosRetrait.find(produit => produit.MesTubos.toString() === req.params.id.toString())
           
           if(tubosExistant){
           const suppression = await RetraitProduit.findByIdAndUpdate(valeur._id, {$pull: {TubosRetrait: {MesTubos: req.params.id}}}, {new:true})
           res.status(201).json({message: "l'objet a ete supprimé", suppression})
           return
            } 
            else{ 
                    const newObjet = new RetraitProduit({
                        nomUtilisateur: req.body.nomUtilisateur,
                        date: moment(new Date()).format('YYYY-MM-DD')
                    })
                    const rechercherUser = await RetraitProduit.findOne({nomUtilisateur: req.body.nomUtilisateur, date: moment(new Date()).format('YYYY-MM-DD')})
                    const user = rechercherUser.TubosRetrait.find(produit => produit.MesTubos.toString() === req.params.id.toString())
                    if(!user){
                       // rechercherUser.TubosRetrait.push({MesTubos: req.params.id, dateRetrait: new Date()})
                        rechercherUser.TubosRetrait.push({MesTubos: req.params.id})
                       // await RetraitProduit.findByIdAndUpdate(rechercherUser._id, {$set: {MesTubos: req.params.id}},{new: true})
                        await rechercherUser.save()
                        res.status(201).json({message: "enregistre bien", rechercherUser})
                        return
                    }else{
                       const suppression= await RetraitProduit.findByIdAndUpdate(rechercherUser._id, {$pull: {TubosRetrait: {MesTubos: req.params.id}}},{new: true})
                       return res.status(201).json({message:"Vous avez deja ajouter l id", suppression})
                        //return
                    }
                    
                }
           }
           res.status(201).json({message:"rien n'est ajouté aujourdhui", dateAujourdhui})
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    AjouterTubosDansFavoris : async (req,res) => {
       // 65f1d2c3d7c8c4a22fb674a2
        const RechercheUserFavoris = await Favoris.findOne({userName: req.body.userName })
        try {
            if(RechercheUserFavoris){
                rechercheId = RechercheUserFavoris.FavorisTubos.find(cableAuFavoris => cableAuFavoris.equals(req.params.id))
                    if(rechercheId){
                        const retirer = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$pull: {FavorisTubos: req.params.id}}, {new:true})  
                        res.status(202).json(retirer)
                        return
                    }else{
                        RechercheUserFavoris.FavorisTubos.push(req.params.id)
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
               rechercheNewUser.FavorisTubos.push(req.params.id)
               res.status(202).json(rechercheNewUser)
               return
            }
        } catch (error) {
            res.status(500).json(error) 
        }
    },

    getTubosFavoris : async(req,res) => {
        try {
            const getTubosFavoris = await Favoris.find({
                userName: req.body.userName //"Landry"
            }).populate('FavorisTubos')
            const mesTubos = getTubosFavoris.find(produit => produit)
            //console.log(mesTubos)
            //res.status(201).json(mesTubos.FavorisTubos)
            res.status(201).json(mesTubos.FavorisTubos)
        } catch (error) {
            res.status(400).send("Erreur")
        }
    },

   
}