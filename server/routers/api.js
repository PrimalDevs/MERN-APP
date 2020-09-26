// Aqui se registran las routes de la api
var express = require("express");
var authRouter = require("./auth");

var app=express();

app.use("/auth/",authRouter);

module.exports=app;