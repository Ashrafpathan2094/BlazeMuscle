const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const Exercise = require('../models/exercise');

const router  = express.Router();

const middleware = require('../middleware/middleware');

router.get('/signin',function(req,res){
	res.render('signin');
});

router.post('/signin',
passport.authenticate("local",{
	successRedirect : '/workout',
	failureRedirect : "/signin",
	failureFlash : true
}));

router.get('/signup',function(req,res){
	res.render('signup');
});

router.post('/signup',function(req,res){
	const Password = req.body.password;
	const newUser = {
		name : req.body.name,
		phoneNumber : req.body['phone-number'],
		username : req.body.email
	};

	User.register(newUser , Password , function(err,user){
		if(err){
			console.log(err);
			req.flash('error','An error occured');
			return res.redirect("/signup");
		} else {
			req.login(user, function(err) {
				if (err) { return next(err); }
				return res.redirect('/workout');
			  });
		}
		
	});
});

router.get('/workout',function(req,res){

	Exercise.find({},function(err,allExercise){
		if(err){
			console.log(err);
		} else {
			res.render('workout',{Exercises : allExercise});
		}
	});

});

// router.get('/signup',function(req,res){
// 	res.render("signup");
// });

// router.post('/signup',function(req,res,next){
// 	// const Password = req.body.password;
// 	// const newUser = {
// 	// 	name : req.body.name,
// 	// 	phoneNumber : req.body['phone-number'],
// 	// 	username : req.body.email
// 	// };

// 	User.register(newUser , Password , function(err,user){
// 		if(err){
// 			console.log(err);
// 			req.flash('error','An error occured');
// 			return res.redirect("/signup");
// 		} else {
// 			req.login(user, function(err) {
// 				if (err) { return next(err); }
// 				return res.redirect('/menu');
// 			  });
// 		}
		
// 	});
// });

// router.get('/signin',function(req,res){
// 	res.render('signin');
// });

// router.post('/signin',
// passport.authenticate("local",{
// 	successRedirect : '/menu',
// 	failureRedirect : "/signin",
// 	failureFlash : true
// }));	

// router.get('/signout', function(req, res){
// 	req.logout();
// 	res.redirect('/menu');
// });

router.get('*',function(req,res){
	res.send("page not found");
});

module.exports = router;