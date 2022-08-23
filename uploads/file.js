const multer = require("multer");

// To upload code
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './images')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }

})



//filter -only accepting valid file - png, jpeg, gif

const filter = function(req, file, cb){
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        cb(null, true) //valid
    }
    else{
        cb(null, false) //invalid
    }
}
const upload = multer({
    storage : storage,
    fileFilter : filter
})


module.exports = upload