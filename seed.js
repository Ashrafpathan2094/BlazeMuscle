const express = require('express');
const mongoose = require('mongoose');

const Exercise = require('./models/exercise.js');

var data = [
    {
        Name: "Pushup",
        ImagePath:"/img/Exercise/pushup.jpg",
        Muscle:"Chest"
    },{
        Name: "Squats",
        ImagePath:"/img/Exercise/squat.jpg",
        Muscle:"Legs"
    },{
        Name: "Goblet Squats",
        ImagePath:"/img/Exercise/goblet-squat.jpg",
        Muscle:"Legs"
    },{
        Name: "Deadlift",
        ImagePath:"/img/Exercise/deadlift.jpg",
        Muscle:"Legs"
    },{
        Name: "Leg Press",
        ImagePath:"/img/Exercise/legpress.jpg",
        Muscle:"Legs"
    },{
        Name: "Leg Extesnion",
        ImagePath:"/img/Exercise/leg-extension.jpg",
        Muscle:"Legs"
    },{
        Name: "Leg Curl",
        ImagePath:"/img/Exercise/legcurl.jpg",
        Muscle:"Legs"
    },{
        Name: "BenchPress",
        ImagePath:"/img/Exercise/benchpress.jpg",
        Muscle:"Chest"
    },{
        Name: "Chest Fly",
        ImagePath:"/img/Exercise/chest-fly.jpg",
        Muscle:"Chest"
    },{
        Name: "PullDown",
        ImagePath:"/img/Exercise/pulldown.jpg",
        Muscle:"Back"
    },{
        Name: "PullUp",
        ImagePath:"/img/Exercise/pullup.jpg",
        Muscle:"Biceps"
    },{
        Name: "Bent Over Rows",
        ImagePath:"/img/Exercise/bentrow-over.jpg",
        Muscle:"Back"
    },{
        Name: "Lunge",
        ImagePath:"/img/Exercise/lunge.jpg",
        Muscle:"Glutes, Hips, Quadriceps"
    },{
        Name: "Upright Row",
        ImagePath:"/img/Exercise/upright-row.jpg",
        Muscle:"Biceps"
    },{
        Name: "OverHead Press",
        ImagePath:"/img/Exercise/overhead-press.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Shoulder Fly",
        ImagePath:"/img/Exercise/shoulder-fly.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Shoulder Shrug",
        ImagePath:"/img/Exercise/shoulder-shrug.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Push Down",
        ImagePath:"/img/Exercise/pushdown.jpg",
        Muscle:"Triceps"
    },{
        Name: "Lying Tricep Extension",
        ImagePath:"/img/Exercise/lying-tricep-extension.jpg",
        Muscle:"Tricpes"
    },{
        Name: "Bicep Curl",
        ImagePath:"/img/Exercise/bicep-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Crunches",
        ImagePath:"/img/Exercise/crunch.jpg",
        Muscle:"Abs"
    },{
        Name: "Russian Twist",
        ImagePath:"/img/Exercise/russian-twist.jpg",
        Muscle:"Abs"
    },{
        Name: "Leg Raise",
        ImagePath:"/img/Exercise/leg-raise.jpg",
        Muscle:"Abs"
    },{
        Name: "HyperExtension",
        ImagePath:"/img/Exercise/hyper-extension.jpg",
        Muscle:"Back"
    },{
        Name: "Wallsit",
        ImagePath:"/img/Exercise/wallsits.jpg",
        Muscle:"Legs"
    },{
        Name: "Plank",
        ImagePath:"/img/Exercise/plank.jpg",
        Muscle:"Abs"
    },{
        Name: "Calf Raise",
        ImagePath:"/img/Exercise/calf-raise.jpg",
        Muscle:"Legs"
    },{
        Name: "Mountain Climber",
        ImagePath:"/img/Exercise/mountain-climber.jpg",
        Muscle:"Abs"
    },{
        Name: "Burpees",
        ImagePath:"/img/Exercise/burpees.jpg",
        Muscle:"Chest"
    },{
        Name: "Single Leg Deadlift",
        ImagePath:"/img/Exercise/single-leg-deadlift.jpg",
        Muscle:"Legs"
    },{
        Name: "Side Plank",
        ImagePath:"/img/Exercise/side-plank.jpg",
        Muscle:"Abs"
    },{
        Name: "Chin Up",
        ImagePath:"/img/Exercise/chin-up.jpg",
        Muscle:"Biceps"
    }
];

function seedDB(){
    Exercise.deleteMany({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log('collection deleted successfully');
            Exercise.insertMany(data,function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Exercise inserted.');
                }
            });
        }
    });
}

module.exports = seedDB;
