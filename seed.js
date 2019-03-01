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
        Muscle:"Legs"
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
        Muscle:"Triceps"
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
    },{
        Name: "Dumbbell Lunges",
        ImagePath:"/img/Exercise/dumbbell-lunges.jpg",
        Muscle:"Legs"
    },{
        Name: "Machine Squats",
        ImagePath:"/img/Exercise/machine-squat.jpg",
        Muscle:"Legs"
    },{
        Name: "Bulgarian Split Squats",
        ImagePath:"/img/Exercise/bulgarian-split-squat.jpg",
        Muscle:"Legs"
    },{
        Name: "Barbell Deadlift",
        ImagePath:"/img/Exercise/barbell-deadlift.jpg",
        Muscle:"Back"
    },{
        Name: "Wide Grip PullUp",
        ImagePath:"/img/Exercise/wide-grip-pull-up.jpg",
        Muscle:"Back"
    },{
        Name: "Standing Tbar Row",
        ImagePath:"/img/Exercise/standing-tbar-row.jpg",
        Muscle:"Back"
    },{
        Name: "Wide Grip Seated Cable Row",
        ImagePath:"/img/Exercise/wide-grip-seated-cable-row.jpg",
        Muscle:"Back"
    },{
        Name: "Decline Bench Dumbell PullOver",
        ImagePath:"/img/Exercise/decline-bench-dumbell-pull-over.jpg",
        Muscle:"Back"
    },{
        Name: "Barbbell Bench Press",
        ImagePath:"/img/Exercise/barbbell-bench-press.jpg",
        Muscle:"Chest"
    },{
        Name: "Low Incline Barbbell Bench Press",
        ImagePath:"/img/Exercise/low-incline-barbbell-bench-press.jpg",
        Muscle:"Chest"
    },{
        Name: "Seated Machine Chest Press",
        ImagePath:"/img/Exercise/seated-machine-chest-press.jpg",
        Muscle:"Chest"
    },{
        Name: "Incline Dumbbell Press",
        ImagePath:"/img/Exercise/incline-dumbbell-press.jpg",
        Muscle:"Chest"
    },{
        Name: "Dips For Chest",
        ImagePath:"/img/Exercise/dips-for-chest.jpg",
        Muscle:"Chest"
    },{
        Name: "Peck Deck Machine",
        ImagePath:"/img/Exercise/peck-deck-machine.jpg",
        Muscle:"Chest"
    },{
        Name: "Hanging Leg Raise",
        ImagePath:"/img/Exercise/hanging-leg-raise.jpg",
        Muscle:"Abs"
    },{
        Name: "Kneeling Cable Crunch",
        ImagePath:"/img/Exercise/kneeling-cable-crunch.jpg",
        Muscle:"Abs"
    },{
        Name: "Exercise Ball Pike",
        ImagePath:"/img/Exercise/exercise-ball-pike.jpg",
        Muscle:"Abs"
    },{
        Name: "Swiss Ball Crunch",
        ImagePath:"/img/Exercise/swiss-ball-crunch.jpg",
        Muscle:"Abs"
    },{
        Name: "Flutter Kicks",
        ImagePath:"/img/Exercise/flutter-kicks.jpg",
        Muscle:"Abs"
    },{
        Name: "Pike To SuperMan",
        ImagePath:"/img/Exercise/pike-to-superman.jpg",
        Muscle:"Abs"
    },{
        Name: "Incline Inner Biceps Curl",
        ImagePath:"/img/Exercise/incline-inner-biceps-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Zottman Curl",
        ImagePath:"/img/Exercise/zottman-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Hammer Curl",
        ImagePath:"/img/Exercise/hammer-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Over Head Cable Curl",
        ImagePath:"/img/Exercise/overhead-cable-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Standing Biceps Cable Curl",
        ImagePath:"/img/Exercise/standing-biceps-cable-curl.jpg",
        Muscle:"Biceps"
    },{
        Name: "Tricep Cable Rope PushDown",
        ImagePath:"/img/Exercise/tricep-cable-rope-pushdown.jpg",
        Muscle:"Triceps"
    },{
        Name: "Skull Crusher",
        ImagePath:"/img/Exercise/skull-crusher.jpg",
        Muscle:"Triceps"
    },{
        Name: "Bench Dips",
        ImagePath:"/img/Exercise/bench-dips.jpg",
        Muscle:"Triceps"
    },{
        Name: "Daimond Press Ups",
        ImagePath:"/img/Exercise/daimond-press-ups.jpg",
        Muscle:"Triceps"
    },{
        Name: "Close Grip Floor Press",
        ImagePath:"/img/Exercise/close-grip-floor-press.jpg",
        Muscle:"Triceps"
    },{
        Name: "Tate press",
        ImagePath:"/img/Exercise/tate-press.jpg",
        Muscle:"Triceps"
    },{
        Name: "Underhand Kickback",
        ImagePath:"/img/Exercise/underhand-kickback.jpg",
        Muscle:"Triceps"
    },{
        Name: "One Arm Over Head Extension",
        ImagePath:"/img/Exercise/one-arm-overhead-extension.jpg",
        Muscle:"Triceps"
    },{
        Name: "Cable Reverse Flye",
        ImagePath:"/img/Exercise/cable-reverse-fly.jpg",
        Muscle:"Shoulder"
    },{
        Name: "One Arm Cable Lateral Raise",
        ImagePath:"/img/Exercise/one-arm-cable-lateral-raise.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Cable Front Raise",
        ImagePath:"/img/Exercise/cable-front-raise.jpg",
        Muscle:"Shoulder"
    },{
        Name: "FacePull",
        ImagePath:"/img/Exercise/face-pull.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Dumbbell Lateral Raise",
        ImagePath:"/img/Exercise/dumbbell-lateral-raise.jpg",
        Muscle:"Shoulder"
    },{
        Name: "Seated Dumbbell Shoulder Press",
        ImagePath:"/img/Exercise/seated-dumbbelle-shoulder-press.jpg",
        Muscle:"Shoulder"
    },{
        Name: "HighPull",
        ImagePath:"/img/Exercise/high-pull.jpg",
        Muscle:"Shoulder"
    },{
        Name: "TrapRaise",
        ImagePath:"/img/Exercise/trap-raise.jpg",
        Muscle:"Shoulder"
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
