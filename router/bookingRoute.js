const express= require("express");
const router = new express.Router();
const Booking = require("../models/bookingModel")
const auth = require("../auth/auth");

router.post("/client/booking", function(req,res){

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const bookingdate = req.body.bookingdate;
    const pujaservicename = req.body.pujaservicename;
    const panditname = req.body.panditname

    const data = new Booking({
        
        name : name,
        phone : phone,
        email : email,
        address : address,
        bookingdate : bookingdate,
        pujaservicename : pujaservicename,
        panditname : panditname,

    })

    data.save()
    .then(function(){
        res.json({message : "Your booking is submitted. We will contact you soon :)"});
    })
    .catch(function(e){
        res.json(e)
    })
})


// To view all the bookings by admin
//Admin Login Required

router.get('/booking/all',auth.verifyAdmin, function(req,res){
    Booking.find()
    .then(function(result){
        res.json(result);
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})


// To delete Booking
//Admin login required

router.delete('/Booking/delete/:bid', auth.verifyAdmin, function(req,res){
    const bid = req.params.bid;
    Booking.deleteOne({_id : bid})
    .then(function(){
        res.json({message : "Booking is deleted! "});
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

    
module.exports=router;