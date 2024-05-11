const UserSchema = require('../Models/UserModel')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

// import { User } from '../interfaces
module.exports = {
    creerCompte : async (req, res) => {
        const newUserSchema = new UserSchema({
            nom: req.body.nom,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_USER).toString()
        })
        try {
            const  userExist = await UserSchema.findOne({nom: req.body.nom})   
            if (!userExist){
                console.log(`Le nouveau utilisateur a bien été ajouté`)
                return res.status(201).json(await newUserSchema.save())
            } else{     
                return res.status(409).send({message: 'Ce pseudo est déjà utilisé'})
            }  
        } catch (error) {
            res.status(500).json({message: error})
        }
    } ,

    LoginUser : async(req,res) => {
        try {
            const RechercheNom = await UserSchema.findOne({nom: req.body.nom})
            if(!RechercheNom){
               return res.status(401).json({message: "ce nom n'existe pas"})
            }

            const bytes  = CryptoJS.AES.decrypt(RechercheNom.password, process.env.CRYPTO_USER);
            const originalTextPassword = bytes.toString(CryptoJS.enc.Utf8);

            if(originalTextPassword !== req.body.password){
                return  res.status(403).json({message:"Revoyer Votre Password"})
            }

            const userToken = jwt.sign({
               id: RechercheNom._id
              }, process.env.JWT_SEC, { expiresIn: '360d' });

              const {password, __v, createdAt, updatedAt, ...userDate} = RechercheNom._doc
              return res.status(202).json({...userDate, token: userToken})
        } catch (error) {
            res.status(500).json({message: error}) 
        }
    },

    deleteUser : async (req,res) => {
        try {
            const rechercherNom = await  UserSchema.findOneAndDelete({nom: req.body.nom})
            res.status(200).json(rechercherNom)
        } catch (error) {
            res.status(500).json({message: error}) 
        }
    },

    Deconnection : async (req,res) => {

    },

   AfficherUser : async (req, res) => {
    try {
        console.log("Affiche", req.params.id)
        const rechercherUser = await UserSchema.findOne({nom: req.params.nom})
        //console.log(req.body.password)
        const NewPassword =  CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_USER).toString()
        const update = await UserSchema.findByIdAndUpdate(req.params.id, {$set :{nom: req.params.nom, password :  NewPassword}}, {new: true})
        await update.save()
        res.status(201).json(update)
    } catch (error) {
        res.status(500).json({message: error})
    }
   }
}