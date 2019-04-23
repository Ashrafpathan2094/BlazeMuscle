const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes/routes');
const admin = require('./routes/admin');
const app = express();

const User = require('./models/user');
const Exercise = require('./models/exercise');
const Admin = require("./models/admin");

const seedDB = require('./seed');

const port = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/gymDB",{ useNewUrlParser:true },function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('connected');
		if(Exercise.find({},function(err,items){
			if(items.length === 0){
				seedDB();
			}
		}));
		Admin.findOne({username:'admin'},function(err,foundDoc){
			if(!foundDoc){
				const password = 'admin123';
				Admin.register({username : 'admin'},password,function(err,user){
					if(err){
						console.log(err);
					} else {
						console.log('Admin Registered.');
					}
				});
			}
		});
	}
});

app.use(cookieParser());
app.use(session({
	cookie: { maxAge: 60000 },
	resave:false,
	saveUninitialized:false,
	secret : 'secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

passport.use('local',new LocalStrategy(User.authenticate()));
passport.use('admin-local',new LocalStrategy(Admin.authenticate()));

passport.serializeUser(function(user, done) {	
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		if(user) {
			done(err, user);
		} else {
			Admin.findById(id,function(err,admin){
				done(err,admin);
			});
		}
	});
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.alert = req.flash('alert');
	res.locals.errors = req.flash('error');
	res.locals.success = req.flash('success');
	res.locals.user = req.user;
    next();
});

app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');

app.use('/',routes);
app.use('/admin',admin);

app.listen(port,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Server Started.....');
	}
});
