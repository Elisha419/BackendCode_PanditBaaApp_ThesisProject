const mongoose = require("mongoose");

const UpcomingEvents = new mongoose.Schema({
    ueimage: {
        type: String
    },
    uename : {
        type : String
    },
    uedate : {
        type : String
    },
    uedescription : {
        type : String
    },
    
    
})

module.exports = mongoose.model('UpcomingEvents', UpcomingEvents);