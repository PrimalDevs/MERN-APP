const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const cors = require("cors");


const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    if (process.env.NODE_ENV !=="test"){
        console.log("Conectado a %s",MONGODB_URL);
        console.log("App ajecutandose")
    }
}).catch(err=> {
    console.error("La app se inicio con errores");
    process.exit(1);
});

const db = mongoose.connection;

const app = express();

// Para ocultar logs cuando el env es test
if(process.env.NODE_ENV!=="test"){
    app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

// Permitir peticiones desde multiples origenes
app.use(cors());

// Prefijo de las routes y donde estan ubicadas
app.use("/",indexRouter);
app.use("/api",apiRouter);

// Error 404 si la url no existe
app.all("*", function(req, res) {
    return apiResponse.notFoundResponse(res, "Pagina no encontrada");
});

app.get('/ping',(req,res)=>res.send('pong'))

app.use((err, req, res)=>{
    if(err.name="UnauthorizedError"){
        return  apiResponse.unauthorizedResponse(res,err.message);
    }
})

module.exports = app;