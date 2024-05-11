const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const multer = require('multer')
/*const ContactRouter = require('./Routes/ContactRouter')
const ProduitRouter = require('./Routes/ProduitRouter')
const CategorieRouter = require('./Routes/CategorieTouter')
const FavorisRouter = require('./Routes/FavorisRouter')
const UserRouter = require('./Routes/UserRouter')
const CochesRouter = require('./Routes/CochesRouter')
const CableRouter = require('./Routes/CableRouter')
const TubosRouter = require('./Routes/TubosRouter')
const TornilleriaRouter = require('./Routes/TornilleriaRouter')*/
const UserRouter = require('./Routes/UserRouter')
const TubosRouter = require('./Routes/TubosRouter')
const TornilleriaRouter = require('./Routes/TornilleriaRouter')
const ProduitRouter = require('./Routes/ProduitRouter')
const FavorisRouter = require('./Routes/FavorisRouter')
const ContactRouter = require('./Routes/ContactRouter')
const CochesRouter = require('./Routes/CochesRouter')
const CategorieRouter = require('./Routes/CategorieTouter')
const CableRouter = require('./Routes/CableRouter')
//const AccueilDescription = require('./Routes/AccueilDescription')
//const cloudinary = require('../utils/cloudinary')
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

mongoose.connect(process.env.MONGO_URL,{
  //useNewUrlParser: true, 
}).then(()=> console.log("connected succesfully")).catch((error)=> console.log(error))
//Ilerdagua2024



app.use(express.json({limit: "100mb"}))
app.use(express.urlencoded({limit:"100mb", extended:true}))

app.use("/api/user", UserRouter)


//app.use("/api/AccueilDescription", AccueilDescription)
app.use("/api/TubosRouter", TubosRouter)
app.use("/api/Tornilleria", TornilleriaRouter)
app.use("/api/Produit", ProduitRouter)
app.use("/api/Favoris", FavorisRouter)
app.use("/api/contact", ContactRouter)
app.use("/api/Coches", CochesRouter)
app.use("/api/Categorie", CategorieRouter)
app.use("/api/Cables", CableRouter)

//ici
const storage = multer.memoryStorage();


app.get('/', (req, res) => res.send('Hello World Cool!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${port}!`))