const mongoose = require("mongoose");

const Booking = mongoose.model("Booking",{
    name : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String
    },
    address: {
        type : String
    },
    bookingdate : {
        type : String
    },
    pujaservicename : {
        type : String
    },
    panditname : {
        type : String
    },
    
})

module.exports = Booking;