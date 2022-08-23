const mongoose = require("mongoose");

const Service = new mongoose.Schema({
    simage: {
        type: String
    },
    sname : {
        type : String
    },
    sdescription : {
        type : String
    },
    
})

module.exports = mongoose.model('Service', Service);