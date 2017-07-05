// This is a practice node js app that will you express as the framework and mongodb for the database
// Website for Parry's World
//=================================================================

var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport"),
    FacebookStrategy  = require("passport-facebook"),
    LocalStrategy     = require("passport-local"),
    session           = require("express-session"),
    methodOverride    = require("method-override"),
    Post              = require("./models/post"),
    User              = require("./models/admin"),
    ejsLint           = require("ejs-lint"),
    http              = require("http"),
    seedDB            = require("./seeds");


//=================================================================
//  REQUIRING ROUTES
//=================================================================

var postRoutes    = require("./routes/posts"),
    indexRoutes   = require("./routes/index");

//=================================================================
// SETUP APP
//=================================================================

    //seedDB();

    mongoose.connect("mongodb://localhost/parrys_world");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));

//=================================================================
// PASSPORT CONFIG
//=================================================================

app.use(require("express-session")({
    secret: "The secret is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//=================================================================
// SETTING UP ROUTES
//=================================================================
app.use(indexRoutes);
app.use(postRoutes);
//app.use(commentRoutes);

//=================================================================
// SERVER SETUP
//=================================================================

    app.listen(3000, function(){
      console.log("serving on port 3000");
    });

//=================================================================
