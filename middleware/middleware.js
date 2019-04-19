const middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        // next();
        console.log(req.user);
        if(req.user.isMember === true){
            next();
        } else {
            req.flash('alert','Your Membership has expired');
            res.redirect('/signin');    
        }
    } else {
        req.flash('alert','You need to sign in');
        res.status(401);
        res.render('signin');
    }
};

middlewareObj.isAdminLoggedIn = function(req,res,next){

    if(req.isAuthenticated()){
        next();
    } else {
        req.flash('alert','You need to sign in');
        res.redirect('/admin/login');
    }

}

module.exports = middlewareObj;