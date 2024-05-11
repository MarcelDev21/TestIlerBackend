const FavorisSchema = require('../Models/FavorisModel')

module.exports = {
    AjouterEtRetirerAuxFavoris : async(req,res) => {
        try {
          //let userName = "Landry"
          const userName = "Marcel"
          if(userName){
            const RechercherUser = await FavorisSchema.findOne({userName : userName})
            //console.log(RechercherUser)
            if(RechercherUser){
                //const id = RechercherUser.Favoris.find(produit => produit.equals(req.params.id))
                const id = RechercherUser.FavorisCategorie.find(produit => produit.equals(req.params.id))
                if(id){
                    const id = await FavorisSchema.findOneAndUpdate({userName: userName}, {$pull: {Favoris : req.params.id}}, {new: true})
                    //console.log("Retirer", id)
                    res.status(202).json(id)
                }else{
                    // Ajoute
                   // RechercherUser.Favoris.push(req.params.id)
                    RechercherUser.FavorisCategorie.push(req.params.id)
                  RechercherUser.save()
                  res.status(202).json(RechercherUser)
                  //console.log("Ajouter", RechercherUser)
                }
            }else{
            const AjouterAuFavoris = new FavorisSchema({ userName: userName })
            await AjouterAuFavoris.save() 
            const RechercheNom = await FavorisSchema.findOne({userName})
            RechercheNom.Favoris.push(req.params.id)
            RechercheNom.save()
            res.status(202).json(RechercheNom)
            //console.log("On a ajouté un nouvel élément")
            }
            // on TESTE
          }  
        } catch (error) {
            console.log(error)
        }
    },

    getDataUser : async(req,res) => {
      try {
        //const userName = "Landry"
        const userName = "Marcel"
       /* if(userName){
          const RechercherUser = await FavorisSchema.findOne({userName : userName})
          if(RechercherUser){
            const id = RechercherUser.Favoris.find(produit => produit.equals(req.params.id))
              if(id){
                const RechercherEnFonctionNom = await FavorisSchema.find({userName: "Landry"}).populate('Favoris')
                const resp = RechercherEnFonctionNom.find(produit => produit)
                const mesFavoris = resp.Favoris
                  res.status(202).json(mesFavoris)
              }
          }
        }*/

        const Favoris = await FavorisSchema.find({
          userName: req.body.userName, //"Marcel"
        }).populate('Favoris')
        if(!Favoris){
          return res.status(400).json({message: 'No User Found'})
        }
        const favorisUser = Favoris.find(favoris => favoris)


        const FavorisCable = await FavorisSchema.find({
          userName: req.body.userName, //"Marcel"
        }).populate('FavorisCable')
        if(!FavorisCable){
          return res.status(400).json({message: 'No User Found'})
        }

        const favorisCableUser = FavorisCable.find(cable => cable)

        const FavorisCategories = await FavorisSchema.find({
          userName: req.body.userName, //"Marcel"
        }).populate('FavorisCategorie')
        if(!FavorisCategories){
          return res.status(400).json({message: 'No User Found'})
        }
        const favorisCategorieUser = FavorisCategories.find(categorie => categorie)

        //ici
        const FavorisTubosTornilleria = await FavorisSchema.find({
          userName: req.body.userName, //"Mbida"
        }).populate('FavorisTornilleria')
        if(!FavorisTubosTornilleria){
          return res.status(400).json({message: 'No User Found'})
        }


        const FavorisTuboss = await FavorisSchema.find({userName: req.body.userName,
          // "Landry"
          }).populate('FavorisTubos')
        if(!FavorisTuboss){
          return res.status(400).json({message: 'No User Found'})
        }
        const favorisTubosUser = FavorisTuboss.find(categorie => categorie)

        const favorieTornilleria = FavorisTubosTornilleria.find(produit => produit.FavorisTornilleria)
        console.log(favorieTornilleria.FavorisTornilleria)

        res.status(202).json(
          /*{  id: "yves",
            Favoris: favorisUser.Favoris,
            FavorisCable: favorisCableUser.FavorisCable,
            FavorisCategorie: favorisCategorieUser.FavorisCategorie}*/
            {
              favoris: favorisUser.Favoris,
              favorisCableUser: favorisCableUser.FavorisCable,
              favorisTornilleriaUser: favorieTornilleria.FavorisTornilleria,
              favorisTubosUser: favorisTubosUser.FavorisTubos,
            }
        )
      } catch (error) {
        console.log(error)
      }
    }
}
