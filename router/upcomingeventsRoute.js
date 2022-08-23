const express= require("express");
const router = new express.Router();
const UpcomingEvents = require("../models/upcomingeventsModel");
const auth = require("../auth/auth");
const upload= require("../uploads/file");

//To insert upcoming events
//Admin login is required
router.post("/upcomingevents/insert",auth.verifyAdmin, upload.single("upcomingevents_image"), function(req,res){

    const uename = req.body.uename;
    const uedescription = req.body.uedescription;
    const uedate = req.body.uedate;
    const ueimage = req.file.filename;
    
    const data = new UpcomingEvents({
        
        uename : uename,
        uedescription : uedescription,
        uedate : uedate,
        ueimage : ueimage
    })
    data.save()
    .then(function(){
        res.json({message : "Upcoming Event is submitted successfully", success:"true"});
    })
    .catch(function(){
        res.json({message : "Error: Upcoming Event is not submitted"})
    })
})
    

//to update the Upcoming Event details
//Admin login is required

router.put("/upcomingevents/update", auth.verifyAdmin, /*upload.single("upcomingevents_image"),*/ function(req,res){
    const ueid = req.body.ueid;
    uename = req.body.uename,
    uedescription = req.body.uedescription,
    uedate = req.body.uedate;
    
    UpcomingEvents.updateOne({_id: ueid},{
        uename: uename,
        uedescription: uedescription,
        uedate: uedate,
    })

    
    .then(function(){
        res.json({message : "Upcoming Event is updated! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To update Upcoming Event image
//Admin login is required

router.put("/upcomingevents/image/update", auth.verifyAdmin, upload.single("ueimage"), function(req,res){
    const ueid = req.body.ueid;
    const ueimage = req.file.filename;

    UpcomingEvents.updateOne({_id: ueid},{
        ueimage: ueimage
    })

    .then(function(){
        res.json({message : "Upcoming Event image is updated! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})



// To delete details of Upcoming Event 
//Admin login required

router.delete('/upcomingevents/delete/:ueid', auth.verifyAdmin, function(req,res){
    const ueid = req.params.ueid;
    UpcomingEvents.deleteOne({_id : ueid})
    .then(function(){
        res.json({message : "Upcoming Event is deleted! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To view all the Upcoming Event by admin
//Admin Login Required

router.get('/upcomingevents/all',auth.verifyAdmin, function(req,res){
    UpcomingEvents.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

// To view all the Upcoming Event by clients
//Client Login Required

router.get('/upcomingevents/total',auth.verifyClient, function(req,res){
    UpcomingEvents.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


//service/one/
// to view Upcoming Event of logged in admin
router.get('/upcomingevents/one/:ueid', auth.verifyAdmin, function(req,res){
    const ueid = req.params.ueid;
    UpcomingEvents.findOne({_id : ueid})
     .then(function(result){
         res.json(result)
     })
     .catch(function(){
         res.json({message : "something went wrong"})
     })
 })



module.exports=router;




