const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");
const Admin = require("../models/adminModel");


//guard for Client
module.exports.verifyClient = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const cdata = jwt.verify(token, "anysecretkey");
        Client.findOne({_id : cdata.clientId}).then(function(clientData){
            //console.log(clientData)
            req.ClientInfo = clientData;
            next();
        })
        .catch(function(e){
            res.json({error : e})
        })
    }
    catch(e){
        res.json({error : e})
    }
}
//guard for Admin
module.exports.verifyAdmin = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const adata = jwt.verify(token, "admin");  //anysecretkey is secret key
        Admin.findOne({_id : adata.adminId}).then(function(adminData){
            //console.log(adminData)
            req.AdminInfo = adminData;
            next();
        })
        .catch(function(e){
            res.json({error : e})
        })
    }
    catch(e){
        res.json({error : e})
    }
}



