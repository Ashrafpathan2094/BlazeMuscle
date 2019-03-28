const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const itemSchema = mongoose.Schema({
    exercise_id : {
        type : ObjectId,
        required : true
    },
    sets : {
        type : String,
        required : true
    },
    reps : {
        type : String,
        required : true
    },
    weight : {
        type : String,
        required : true
    }
},{_id : false});

const logSchema = mongoose.Schema({
        log : [itemSchema],
        createdAt : Date,
        log_id : ObjectId
},{_id:false});

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    phoneNumber : {
        type : String,
        required : true,
        minlength : 1,
        maxlength: 10,
        trim : true,
        unique: true
    },
    username : {
        type : String,
        required : true,
        unique:true,
        trim  : true
    } , 
    logs : [logSchema]
});

userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User",userSchema,'user');

