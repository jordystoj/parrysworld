var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/admin");


//=================================================================
// LANDING PAGE - ROOT ROUTE
//=================================================================

router.get("/", function(req, res){
   res.redirect("/posts");
});


//=================================================================
// ADMIN ROUTE - RENDERS A LOGIN FORM FOR THE ADMIN
//=================================================================

router.get("/admin", function(req, res){
  res.render("admin");
});

//=================================================================
// LOGIN LOGIC - HANDELS LOGIN LOGIC
//=================================================================

router.post("/admin_login", passport.authenticate("local",
    {
        successRedirect: "/posts",
        failureRedirect: "/admin"
    }), function(req, res){
});

//=================================================================
// LOGOUT ROUTE - LOGS THE USER OUT
//=================================================================

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/posts");
});

//=================================================================
// LOGIN MIDDLEWARE - CHECKS IF SOMEONE IS LOGGED IN
//=================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//=================================================================
// REGISTER ROUTE - USED FOR REGISTERING PEOPLE
//=================================================================
//
// router.get("/register", function(req, res){
//    res.render("register");
// });
//
// // //handle sign up logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//            res.redirect("/posts");
//         });
//     });
// });

//=================================================================
// SUBSCRIBE ROUTE -- FOR PEOPLE TO SUBSCRIBE W/ EMAIL
//=================================================================

router.get("/subscribe", function(req, res){
    res.send("hello");
});

//=================================================================
// CONTACT ROUTE -- FOR PEOPLE TO CONTACT ADMIN
//=================================================================
 router.get("/contact", function(req, res){
   res.render("posts/contact")
 });
 
module.exports = router;
