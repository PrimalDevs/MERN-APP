const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./routers/index");
const apiRouter = require("./routers/api");
const apiResponse = require("./helpers/apiResponse");
const cors = require("cors");


const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	if(process.env.NODE_ENV !== "test") {
		console.log("BD -> %s", MONGODB_URL);
		console.log("Aplicacion en ejecucion ... \n");
		console.log("CTRL + C para detener el proceso. \n");
	}
})
	.catch(err => {
		console.error("La app se inicio con errores:", err.message);
		process.exit(1);
	});

const db = mongoose.connection;

const app = express();

// Para ocultar logs cuando el env es test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Permitir peticiones desde multiples origenes
app.use(cors());

// Prefijo de las routes y donde estan ubicadas
app.use("/",indexRouter);
app.use("/api",apiRouter);
app.get('/ping',(req,res)=>res.send('pong'))

// Error 404 si la url no existe
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;