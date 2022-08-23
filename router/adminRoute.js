const express = require("express");
const bycrptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const router  = new express.Router();
const admin = require("../models/adminModel");
const bcryptjs = require("bcryptjs");
const { where } = require("../models/adminModel");
const { append } = require("express/lib/response");
const auth = require("../auth/auth");

router.post("/admin/register", function(req,res){
    const username = req.body.username;
    admin.findOne({username : username})
    .then(function(adminData){
        if(adminData!=null){
            res.json({message : "Invalid user, admin already exist"});
            return;
        }
        //this is for the user which is not available on db
        const password = req.body.password;
        
        bcryptjs.hash(password, 10, function(e,hashed_value){
            const data = new admin({
                username:username,
                password : hashed_value,
            })
            data.save()
            .then (function(){message : "Successfully Registered"});
        })
    })
    .catch(function(e){
        res.json(e)
    });
});
//login route for Admins
router.post("/admin/login", function(req, res){
    const username  = req.body.username;//name last ko wala username ma
    admin.findOne({username : username})
    .then(function(adminData){
        //console.log(AdminData.email);
        if(adminData===null){
            return res.json({message:"Invalid login credentials"})}
    //comapring the password between the password provided by the client and stored in db
        const password = req.body.password
        // bcryptjs.compare("client","db wala pw",dunction(e,result))
        bcryptjs.compare(password,adminData.password,function(e,result){
            if(result===false){
            //console.log(result);
            return res.json({message: "Invalid credentials"})
             }
            //generating token
            //jsonwebtoken
            //jwt .sign is use for generating token
            const token = jwt.sign({adminId : adminData._id},"admin")//admin ko satta any secret key
            res.json({token:token, message: "Login Successful"})
        })
    })
})

module.exports = router;