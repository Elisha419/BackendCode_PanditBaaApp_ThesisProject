const express= require("express");
const router = new express.Router();
const Contact = require("../models/contactModel")
const auth = require("../auth/auth");

router.post("/client/contact", function(req,res){

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const message = req.body.message

    const data = new Contact({
        
        name : name,
        phone : phone,
        email : email,
        message : message,
    })

    data.save()
    .then(function(){
        res.json({message : "All the contact details have been submitted successfully"});
    })
    .catch(function(e){
        res.json(e)
    })
})


// To view all the contacts by admin
//Admin Login Required

router.get('/contact/all',auth.verifyAdmin, function(req,res){
    Contact.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To delete service
//Admin login required

router.delete('/contact/delete/:cid', auth.verifyAdmin, function(req,res){
    const cid = req.params.cid;
    Contact.deleteOne({_id : cid})
    .then(function(){
        res.json({message : "Contact is deleted! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

    
module.exports=router;