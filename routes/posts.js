var express = require("express"),
    router  = express.Router(),
    Post   = require("../models/post"),
    middleware = require("../middleware");

//=================================================================
// INDEX -- SHOW ALL POSTS
//=================================================================

router.get("/posts", function(req, res){
  //Get all posts from the DB
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    } else {
      res.render("posts/index",{posts: allPosts});
    }
  });
});

//=================================================================
// CREATE ROUTE -- ADDS A NEW POST TO THE DB
//=================================================================

router.post("/posts", middleware.isLoggedIn, function(req, res){
  //Get data from form and add to posts array
  var title = req.body.title;
  var image = req.body.image;
  var content = req.body.content;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newPost = {title: title, image: image, content: content, author: author};
  //Create a new campground and save to the DB
  Post.create(newPost, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      //redirect to the posts page
      res.redirect("/posts");
    }
  });
});

//=================================================================
// NEW ROUTE -- SHOWS THE FORM TO CREATE A NEW POST
//=================================================================

router.get("/posts/new", middleware.isLoggedIn, function(req, res){
    res.render("posts/new");
});

//=================================================================
// SHOW ROUTE -- SHOWS MORE INFO ABOUT A BLOG POST
//=================================================================

router.get("/posts/:id", function(req, res){
    //find the campgrounds with provided ID
    Post.findById(req.params.id).exec(function(err, foundPost){
       if(err){
           console.log(err);
       } else {
            //render show template with that campground
            res.render("posts/show", {post: foundPost});
       }
    });
});

//=================================================================
// EDIT ROUTE -- SHOWS THE FORM TO EDIT THE POSTS
//checkPostOwnership ~ use this for auth
//=================================================================

router.get("/posts/:id/edit", middleware.isLoggedIn, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
      if(err){
        console.log(err);
      } else {
      res.render("posts/edit", {post: foundPost});
      }
    });
});

//=================================================================
// UPDATE ROUTE -- UPDATES THE EDIT OF THE CAMPGROUND
//=================================================================

router.put("/posts/:id", middleware.isLoggedIn, function(req, res){
    //find and update the correct somewhere
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/posts");
        } else {
            //redirect somewhere(showpage)
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//=================================================================
// DESTROY ROUTE -- REMOVES CAMPGROUNDS FROM DB
//=================================================================

router.delete("/posts/:id", middleware.isLoggedIn, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});

module.exports = router;
