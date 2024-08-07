const AccueilDescription = require('../Models/AccueilDescription')
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const { MailtrapClient } = require("mailtrap");
//const resend = new Resend("re_123456789");
//const Resend = require('resend')
//const nodemailer = require('nodemailer');
//const mailjet = require('node-mailjet').connect(apiKey, apiSecret);
//const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);


//const Mailjet = require('node-mailjet');
const TokenNotification = require('../Models/TokensNotification')
const User = require('../Models/UserModel')

dotenv.config()
//const mailjet = require('node-mailjet').connect("c21e4c11f8b412519042161cd417abee", "e9bf663a5dfe2a6860443703c639df5f");

/*const mailjet = Mailjet.apiConnect(
    "c21e4c11f8b412519042161cd417abee",
     "e9bf663a5dfe2a6860443703c639df5f",
 );*/

/* const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
 );*/

/*function generateHTML(emailContent) {
    return `
      <h3>${emailContent.title}</h3>
      <p>${emailContent.message}</p>
      <!-- Ajoutez d'autres éléments HTML en fonction de vos besoins -->
    `;
  }*/

  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
      user: 'resend',
      pass: 're_X6Xmx8xq_2YCyy4mqchnFbrWgsGbpiwnS',
    },
  });

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

    /*SendMail : async (req, res)=> {
      try {
        var data = {
          service_id: 'service_n49dh4i',
          template_id: 'template_hdzu6ut',
          user_id: 'r9YaA1og2mBat0RN7',
          template_params: {
              'username': 'James',
              'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
          }
      };
      const goData = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      })
      const due = await goData.json()
      console.log(due)
      return res.status(200).json(goData)
      } catch (error) {
        console.log(error)
      }
    },*/


    /*EnvoyerMessageAvecMailTrap : async (req,res)=> {
      try {
        const { MailtrapClient } = require("mailtrap");

        const TOKEN = "1d1ff8d7c16e8e419bb4a3a4b8d1a347";
        const ENDPOINT = "https://send.api.mailtrap.io/";
        
        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
        
        const sender = {
          email: "mailtrap@demomailtrap.com",
          name: "Mailtrap Objet",
        };
        const recipients = [
          {
            email: "bidstring3@gmail.com",
          }
        ];
        
        client
          .send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
          })
          .then(console.log, console.error);
      } catch (error) {
        console.log(error)
      }
    },*/

    EnvoyerMessageAvecMailTrap : async (req,res)=> {
      try {
        const { MailtrapClient } = require("mailtrap");

        const TOKEN = "691afb0d59edab114ec77ae6aaf94f47"; 
        const ENDPOINT = "https://send.api.mailtrap.io/";
        
        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
        
        const sender = {
          email:"mailtrap@ilerd.xyz",// "myvesmarcelo@yahoo.fr", 
          name:  "IlerAfrica"//"Mailtrap Objet",
        };
        const recipients = [
          {
            email: "myvesmarcelo@yahoo.com",
          }
        ];
        
        client
          .send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
          })
          .then(console.log, console.error);
      } catch (error) {
        console.log(error)
      }
    },

   /* SendMail : async(req, res) => {
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
    },*/

    KeepDataNotification : async (req,res) => {
     
      const getData = await User.findOne({nom:req.body.nom})
      console.log("execution")

      const newTokens = new TokenNotification({
        userId: getData._id,
        nom: req.body.nom,
        token: req.body.token
      })
      try {
        const verifierSiToken = await TokenNotification.findOne({nom: req.body.nom})
        if(verifierSiToken){
          return res.status(201).json({message:"Vous avez déja un token"})
        }
        await newTokens.save()
        res.status(201).json(newTokens)
      } catch (error) {
        console.log(error)
      }
    },

    GarderToken : async (req, res) => {
      console.log("bindi")
      try {
        const EnvoyerToken = new TokenNotification({
            nom: req.body.nom,
            token: req.body.token,
            data:{
              "screen": "Notif",
            }
          })
        await EnvoyerToken.save()
        console.log("algo pasa")
        res.status(201).json({message:"ceci", EnvoyerToken})
      } catch (error) {
        console.log(error)
      }
    }

    

  
}