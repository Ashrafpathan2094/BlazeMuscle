const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    Name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    ImagePath : {
        type : String,
        required : true,
    },
    Muscle : {
        type : String,
        required : true
    }
});

module.exports =  mongoose.model("Exercise",exerciseSchema,'exercise');
