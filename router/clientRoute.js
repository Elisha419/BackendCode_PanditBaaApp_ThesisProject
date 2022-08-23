
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const Client = require("../models/clientModel");
const { append } = require("express/lib/response");
const auth = require("../auth/auth");
const upload = require("../uploads/file");

router.post("/client/register", function(req, res){
    const username = req.body.username;
    Client.findOne({username : username})
    .then(function(clientData){
        if(clientData!=null){
            res.json({message: "User Already Exists!"});
            return;
        }
        //now this place is for the user which isnot available in database.
        const name = req.body.name;
        const phone = req.body.phone;
        const address = req.body.address;
        const email = req.body.email;
        const password = req.body.password;
        bcryptjs.hash(password, 10, function(e, hashed_value){

            const data = new Client({
                name : name,
                phone : phone,
                address : address,
                email : email,
                username : username,
                password : hashed_value,
                //profile : req.file.filename
            })
            data.save()
            .then(function(){
                res.json({message : "Registered Success"});
            })
            .catch(function(e){
                res.json(e)
            })
        });
    })

})

//login route for client
router.post("/client/login", function(req,res){
    const username = req.body.username;
    Client.findOne({username : username})
    .then(function(clientData){
        if(clientData===null){
            return res.json("message: Invalid login credentials!")
        }
        //now the code for compairing password between the password provided by the client and password stored in database.
        const password = req.body.password;
        bcryptjs.compare(password, clientData.password, function(e, result){
            //console.log(result);
            if(result===false){
                return res.json({message: "Invalid"})
            }

            //now lets generate token
            //jsonwebtoken
            //jwt.sign helps to create token
            const token = jwt.sign({clientId : clientData._id}, "anysecretkey");
            res.json({token : token, message : "Login Successful", success:true})

        })
        
    })

})




module.exports = router;