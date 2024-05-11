const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cloudinary = require('cloudinary').v2;
const multer = require('multer')

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


app.get('/', (req, res) => res.send('Hello World !'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${port}!`))