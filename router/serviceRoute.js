const express= require("express");
const router = new express.Router();
const Service = require("../models/serviceModel");
const auth = require("../auth/auth");
const upload= require("../uploads/file");

//To insert service
//Admin login is required
router.post("/service/insert",auth.verifyAdmin, upload.single("service_image"), function(req,res){

    const sname = req.body.sname;
    const sdescription = req.body.sdescription;
    const simage = req.file.filename;
    
    const data = new Service({
        
        sname : sname,
        sdescription : sdescription,
        simage : simage
    })
    data.save()
    .then(function(){
        res.json({message : "Service is submitted successfully", success:"true"});
    })
    .catch(function(){
        res.json({message : "Error: Service is not submitted"})
    })
})
    

//to update the service details
//Admin login is required

router.put("/service/update", auth.verifyAdmin, /*upload.single("service_image"),*/ function(req,res){
    const sid = req.body.sid;
    sname = req.body.sname,
    sdescription = req.body.sdescription,
    // simage = req.body.simage;

    Service.updateOne({_id: sid},{
        sname: sname,
        sdescription: sdescription,
        // simage: simage
    })

    
    .then(function(){
        res.json({message : "Service is updated! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To update service image
//Admin login is required

router.put("/service/image/update", auth.verifyAdmin, upload.single("simage"), function(req,res){
    const sid = req.body.sid;
    const simage = req.file.filename;

    Service.updateOne({_id: sid},{
        simage: simage
    })

    .then(function(){
        res.json({message : "Service image is updated! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})



// To delete service details
//Admin login required

router.delete('/service/delete/:sid', auth.verifyAdmin, function(req,res){
    const sid = req.params.sid;
    Service.deleteOne({_id : sid})
    .then(function(){
        res.json({message : "Service is deleted! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To view all the services by admin
//Admin Login Required

router.get('/service/all',auth.verifyAdmin, function(req,res){
    Service.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

// To view all the services by client
//Client Login Required

router.get('/service/total',auth.verifyClient, function(req,res){
    Service.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


//service/one/74368
// to view services of logged in admin
router.get('/service/one/:sid', auth.verifyAdmin, function(req,res){
    const sid = req.params.sid;
     Service.findOne({_id : sid})
     .then(function(result){
         res.json(result)
     })
     .catch(function(){
         res.json({message : "something went wrong"})
     })
 })



module.exports=router;




