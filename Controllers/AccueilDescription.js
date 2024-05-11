const AccueilDescription = require('../Models/AccueilDescription')
const cloudinary = require("cloudinary").v2;
//const Resend = require('resend')
//const nodemailer = require('nodemailer');
//const mailjet = require('node-mailjet').connect(apiKey, apiSecret);
//const mailjet = require('node-mailjet').connect("c21e4c11f8b412519042161cd417abee", "e9bf663a5dfe2a6860443703c639df5f");
const dotenv = require('dotenv')
const Mailjet = require('node-mailjet');
const TokenNotification = require('../Models/TokensNotification')
const User = require('../Models/UserModel')

dotenv.config()

/*const mailjet = Mailjet.apiConnect(
    "c21e4c11f8b412519042161cd417abee",
     "e9bf663a5dfe2a6860443703c639df5f",
 );*/

 const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
 );

function generateHTML(emailContent) {
    return `
      <h3>${emailContent.title}</h3>
      <p>${emailContent.message}</p>
      <!-- Ajoutez d'autres éléments HTML en fonction de vos besoins -->
    `;
  }

module.exports = {
    CreerDetail : async (req, res) => {
       // console.log(req.body.nomOutil, req.body.Description)
        const result = await cloudinary.uploader.upload(req.file.path,{folder: "Accueil"}) 
        const newDetail = new AccueilDescription({
            imageIlerdagua: result.secure_url,
            nomOutil : req.body.nomOutil, // Etaf 
            Description:req.body.Description
        })
        try {
            const rechercherNomOutil = await AccueilDescription.findOne({nomOutil: req.body.nomOutil})
            if(rechercherNomOutil){
                return res.status(201).json({message: " Ce produit existe deja"})
            }
            await newDetail.save()
            return res.status(201).json(newDetail)
        } catch (error) {
            console.log(error)
        }
    },

    getDetail : async(req, res) => {
        try {
            const getAllDetail = await AccueilDescription.find()
            return res.status(201).json(getAllDetail)
        } catch (error) {
            console.log(error)
        }
    },

    SendMail : async(req, res) => {
        const titleUse = req.body.title

        const emailContent = {
            title: `Propuesta de ${titleUse}`,
            message: req.body.message
            // Ajoutez d'autres données provenant de votre front end
          };

          const htmlPart = generateHTML(emailContent);
        try {
            const request = mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                  {
                    From: {
                      Email: 'bidString3@gmail.com',
                      Name: 'ilerdagua Store'
                    },
                    To: [
                      {
                        Email: 'myvesmarcelo@yahoo.fr',
                        Name: 'Ilerdagua Store'
                      }
                    ],
                    Subject: 'Propuesta para la proxima version de IlerdaguaStore',
                    TextPart: 'voici le text',
                    HTMLPart: htmlPart,
                   // HTMLPart: '<h3>This is a test email sent from Mailjet. test {}</h3>'
                  }
                ]
              });
              res.status(201).json({message:"este mensage ha sido enviado con exito", request})
        } catch (error) {
            
        }
    },

    KeepDataNotification : async (req,res) => {
      const getData = await User.findOne({nom:req.body.nom})
     // console.log(getData._id)

      const newTokens = new TokenNotification({
        userId: getData._id,
        token: req.body.token
      })
      try {
        await newTokens.save()
        res.status(201).json(newTokens)
      } catch (error) {
        console.log(error)
      }
    }

  
}