var mongoose = require("mongoose");
var Post = require("./models/post");

var data = [
    {
      title: "Kendrick Lamar - DAMN. Track By Track Review",
      image: "https://pbs.twimg.com/media/C9qQBLNUAAE_1-Q.jpg",
      content: "It was great"
    },
    {
      title: "Ziggy Alberts Giant Dwarf Review",
      image: "https://static.wixstatic.com/media/8e5533_c7c7a2a88792451ca75feecade8175be~mv2.png/v1/fill/w_550,h_550,al_c,usm_0.66_1.00_0.01/8e5533_c7c7a2a88792451ca75feecade8175be~mv2.png",
      content: "Ziggy Alberts’ “Start Over Summer Tour” has now surpassed its 3rd Sydney stop, the all-ages show at the Giant Dwarf Theatre being the final Sydney show on the massive 45+ show tour around the country."
    },
    {
     title: "Sticky Fingers @ the Enmore Theatre Review",
     image: "https://static.wixstatic.com/media/8e5533_c3c5084d74cf4754ab5ac00965f1d0e8~mv2.jpg/v1/fill/w_550,h_550,al_c,lg_1,q_80/8e5533_c3c5084d74cf4754ab5ac00965f1d0e8~mv2.webp",
     content: "Sticky Fingers. When this band comes to mind you can’t think past a sold out Enmore Theatre show, and this one was truely their biggest."
    }
  ];

function seedDB(){
  Post.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("Removed Posts");
   })
  data.forEach(function(seed){
    Post.create(seed, function(err, post){
      if(err){
        console.log(err);
      } else {
        console.log("Added a new post");
      }
    });
  });
 }

module.exports = seedDB;
