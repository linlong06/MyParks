var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Comment         = require("../models/comment"),
    Park      = require("../models/park"),
    middleware      = require("../middleware/index")

//===============
// Comments ROUTEs
//===============

router.get("/new", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {park: foundPark});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, addedComment){
                if (err) {
                    console.log(err);
                } else {
                    // add username and ID to comment
                    addedComment.author.id = req.user._id;
                    addedComment.author.username = req.user.username;
                    addedComment.save();
                    foundPark.comments.push(addedComment);
                    foundPark.save();
                    res.redirect("/parks/" + foundPark._id);                    
                }
            });
        }
        
    });
});


//EDIT: show page to update a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
     Comment.findById(req.params.comment_id, function(err, foundComment){
         if (err) {
             console.log(err);
         } else {
             res.render("comments/edit", {park_id: req.params.id, comment: foundComment});
         }
     });
});

//UPDATE: post updated comment info
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});

//DELETE: delete a comment from DB
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
     Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});



module.exports = router;
