//connect with database by using mongoose

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Thesis_Assignment', {
    useNewUrlParser: true,
    useUnifiedTopology : true
})
