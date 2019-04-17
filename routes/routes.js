const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');

const User = require('../models/user');
const Exercise = require('../models/exercise');

const router  = express.Router();

const middleware = require('../middleware/middleware');

var savedLogs = [];

router.get('/',function(req,res){
	res.redirect('/signin');
});

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

router.get('/signout', function(req, res){
	req.logout();
	res.redirect('/signin');
});

router.get('/log',middleware.isLoggedIn,function(req,res){
	var currentUser = savedLogs.find(function(element){
		return element.user === req.user.username;
	});

	if(typeof currentUser === 'undefined'){
		res.render('log',{log:{}});	
	} else if (typeof currentUser.log === 'undefined'){
		res.render('log',{log:{}});			
	} else if(currentUser.log.length === 0 ){
		res.render('log',{log:{}});	
	} else {
		res.render('log',{log:currentUser.log});
	}

});

router.post('/log',middleware.isLoggedIn,function(req,res){

	if(savedLogs.find(function(element){
		return element.user === req.user.username;
	}) === undefined){
		savedLogs.push({user : req.user.username});
	}

	var removeItem = req.get('removeItem');
	var clearLog = req.get('clearLog');
	
	if(removeItem === 'true'){
		var items = req.query.items;

		var userObject = savedLogs.find(function(element){
			return element.user === req.user.username;
		});


		var itemIndex = userObject.log.findIndex(function(element){
			return element.Name === items;
		});

		userObject.log.splice(itemIndex,1);

		for(var i=0;i<savedLogs.length;i++){
			if(savedLogs[i].user === userObject.user){
				savedLogs[i].log = userObject.log;
				break;
			}
		}
		// console.log(userObject);
		res.sendStatus(200);
	}
	 else if (clearLog === 'true') {

		var userObject = savedLogs.find(function(element){
			return element.user === req.user.username;
		});

		if(typeof userObject.log !== 'undefined'){
			userObject.log = [];
		}

		res.sendStatus(200);
		
	}
	else {
		var items = req.query.items;
		// console.log(savedLogs);

		var logItems = new Promise(function(resolve,reject){
			Exercise.findOne({Name : items},function(err,item){
				if(err){
					reject(err);
				}
				resolve(item);
			});
		});
	
		logItems.then(function(foundItems){

			var user = savedLogs.find(function(element){
				return element.user === req.user.username;
			});

			if( typeof user.log === 'undefined'){
				user.log = [];
				user.log.push(foundItems);
				res.sendStatus(200);
				// console.log(user);
			} else {
				if(user.log.length === 0 ){
					user.log = [];
					user.log.push(foundItems);
				// console.log(user);
				} else {
					var index = user.log.findIndex(function(element){
						return element.Name === foundItems.Name;
					});
		
					if(index === -1){
						user.log.push(foundItems);
					}
				}
				// console.log(user);
				res.sendStatus(200);
			}

		}).catch(function(error){
			console.log(error);
		});
	}

});

router.post('/history',middleware.isLoggedIn,function(req,res){
	var logItems =JSON.parse(req.query.items);
	// console.log(logItems);

	var savedUser = savedLogs.find(function(element){
		return element.user === req.user.username;
	});

	// console.log(logItems);
	// console.log("\n\n"+savedUser);

	if(typeof savedUser === 'undefined' || typeof logItems === 'undefined'){
		req.flash('error','Please Enter items in the log');
		res.redirect('/workout');
	} else if(typeof logItems === 'undefined'){
		req.flash('error','Please Enter items in the log');
		res.redirect('/workout');		
	} else if( logItems.length === 0){
		req.flash('error','Please Enter items in the log');
		res.redirect('/workout');
	}else {
		var logItemsPromises = logItems.map(function(current){
			return new Promise(function(resolve,reject){
				console.log(current);
				Exercise.findOne({Name:current.name},function(err,item){
					if(err){
						reject(err);
					}
					console.log('-----------------');
					console.log(item);
					console.log([item,current.set,current.reps,current.weight]);
					resolve([item,current.set,current.reps,current.weight]);
				});
			});
		});


		Promise.all(logItemsPromises).then(function(foundItems){
			var savedLog = {};
			savedLog.items = [];
			foundItems.forEach(function(current){
				// console.log(current);
				// console.log([current[0]._id,current[1],parseInt(current[1])*parseInt(current[0].Price)]);
				var item = {};
				item.exercise_id = current[0]._id;
				item.sets = current[1],
				item.reps = current[2];
				item.weight= current[3];
				savedLog.items.push(item);
			});
			// console.log(logItems.total);
			// console.log(foundItems);
			// console.log(savedLog);
			// savedUser.log = savedLog;
			savedUser.logItems = [];
			savedUser.logItems = savedLog;
			// console.log(savedUser);
			// console.log();
			// console.log(savedUser.logItems.items);
			var userLog = {};
			userLog.log = savedUser.logItems.items;
			userLog.log_id = mongoose.mongo.ObjectId();
			userLog.createdAt = moment().toDate();
			// console.log();
			// console.log();
			// console.log(userLog);
			User.findOneAndUpdate({username : savedUser.user},{$push : {logs : userLog} },{new:true},function(err,foundUser){
				if(err){
					console.log(err);
				} else {
					// console.log('------------------------');
					// console.log(userLog);
					var logID = userLog.log_id;
					savedUser.log = '';
					savedUser.logItems = '';
					userLog = '';
					// res.render('order',{User:foundUser});
					// res.send('saved Workout');
					res.render('save-workout',{logID : logID});
				}
			});
		}).catch(function(err){
			console.log(err);
		});
		
	}

	// res.send('history');
});

router.get('/workout',middleware.isLoggedIn,function(req,res){

	Exercise.find({},function(err,allExercise){
		if(err){
			console.log(err);
		} else {
			var currentUser = savedLogs.find(function(element){
				return element.user === req.user.username;
			});

			// console.log(currentUser);
			if(typeof currentUser === 'undefined'){
				res.render('workout',{Exercises : allExercise,log:{}});
			} else {
				if(typeof currentUser.log === 'undefined') {
					res.render('workout',{Exercises : allExercise,log:{}});
				} else {
					if(currentUser.log.length === 0 ) {
						res.render('workout',{Exercises : allExercise,log:{}});
					} else {
						res.render('workout',{Exercises:allExercise,log:currentUser.log});
					}
				}
			}
		}
	});

});


router.get('/history',middleware.isLoggedIn,function(req,res){
	User.findOne({username:req.user.username},function(err,foundDoc){
		if(err){
			console.log(err);
		} else {
			console.log(foundDoc);
			res.render('history',{logs:foundDoc.logs,moment:moment});
		}
	});
});

router.get('/history/:id',middleware.isLoggedIn,function(req,res){
	User.findOne({'logs.log_id':req.params.id},function(err,foundDoc){
		if(err) {
			console.log(err);
		} else {
			// console.log('found');
			// console.log(foundDoc);
			// console.log(foundDoc.logs);
			var foundLog =  foundDoc.logs.find(function(current){
				// console.log(current.log_id);
				return current.log_id == req.params.id;
			});
			// console.log('found log');
			console.log(foundLog);
			//create promise array for foundLog.log items and render them to the view down below

			var foundLogPromises = foundLog.log.map(function(current){
				return new Promise(function(resolve,reject){
					Exercise.findById(current.exercise_id,function(err,foundDoc){
						if(err){
							reject(err);
						} else {
							var doc = {
								exercise : foundDoc,
								sets : current.sets,
								reps : current.reps,
								weight : current.weight
							}
							console.log(doc);
							resolve(doc);
						}
					});
				});
			});

			Promise.all(foundLogPromises).then(function(exercises){
				console.log(exercises);
				res.render('view-log',{logs:exercises});
			}).catch(function(err){
				console.log(err);
			});

		}
	});
});

router.get('/update-profile',middleware.isLoggedIn,function(req,res){
	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
		} else {
			// console.log(foundUser);
			res.render('update-profile',{User:foundUser});
		}
	});
});

router.post('/update-profile',middleware.isLoggedIn,function(req,res){

	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
		} else {
			var name = req.body.name || foundUser.name;
			var username = req.body.email || foundUser.username;
			var phoneNumber = req.body['phone-number'] || foundUser.phoneNumber; 

			var updatedUser = {
				name ,
				phoneNumber ,
				username
			}		
			User.findOneAndUpdate({_id : foundUser._id},updatedUser,{new : true},function(err,modifiedUser){
				if(err){
					console.log(err);
					req.flash('error','Error while updating data');
					res.redirect('/update-profile');
				} else {
					req.flash('success','Data updated successfully');
					res.redirect('/update-profile');
				}
			});
		}
	});

});

router.get('/change-password',middleware.isLoggedIn,function(req,res){
	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
		} else {
			res.render('change-password',{User:foundUser});
		}
	});
});

router.post('/change-password',middleware.isLoggedIn,function(req,res){

	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
		} else {
			foundUser.setPassword(req.body['new-password'],function(){
				foundUser.save();
				req.flash('success','Data updated successfully');
				res.redirect('/change-password');
			});
		}
	});

});

router.get('*',function(req,res){
	res.send("page not found");
});

module.exports = router;