const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    Price : {
        type : Number,
        required : true,
        minlength  : 1
    },
    Units : {
        type : Number,
        required : true,
        minlength : 1
    },
    Category : {
        type : String,
        required : true,
        minlength : 1
    }
});

module.exports =  mongoose.model("Item",itemSchema,'item');