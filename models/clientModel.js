const mongoose = require("mongoose");

const Client = mongoose.model("Client",{
    name : {
        type : String
    },
    phone : {
        type : String
    },
    address : {
        type : String
    },
    email : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    

})

module.exports = Client;