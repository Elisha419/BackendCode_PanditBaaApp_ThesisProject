const mongoose = require("mongoose");

const Contact = mongoose.model("Contact",{
    name : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String
    },
    message : {
        type : String
    },
    
})

module.exports = Contact;