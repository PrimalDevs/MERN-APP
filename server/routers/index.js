var express = require("express");
var router = express.Router();

// Get para home
router.get("/", function (req,res){
    res.render("index",{title:"Express server"})
});

module.exports=router;