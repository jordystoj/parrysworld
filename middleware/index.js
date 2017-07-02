var Post = require("../models/post");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkPostOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the post?
            if(foundPost.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/posts");
}

module.exports = middlewareObj;
