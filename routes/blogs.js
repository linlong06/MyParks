var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Blog            = require("../models/blog"),
    Park            = require("../models/park"),
    middleware      = require("../middleware/index")

//===============
// Blogs ROUTEs
//===============

router.get("/new", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/new", {park: foundPark});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            Blog.create(req.body.blog, function(err, addedBlog){
                if (err) {
                    console.log(err);
                } else {
                    // add username and ID to blog
                    addedBlog.author.id = req.user._id;
                    addedBlog.author.username = req.user.username;
                    addedBlog.save();
                    foundPark.blogs.push(addedBlog);
                    foundPark.save();
                    res.redirect("/parks/" + foundPark._id);                    
                }
            });
        }
        
    });
});


//EDIT: show page to update a blog
router.get("/:blog_id/edit", middleware.checkBlogOwnership, function(req, res) {
     Blog.findById(req.params.blog_id, function(err, foundBlog){
         if (err) {
             console.log(err);
         } else {
             res.render("blogs/edit", {park_id: req.params.id, blog: foundBlog});
         }
     });
});

//UPDATE: post updated blog info
router.put("/:blog_id", middleware.checkBlogOwnership, function(req, res) {
     Blog.findByIdAndUpdate(req.params.blog_id, req.body.blog, function(err, updatedBlog){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});

//DELETE: delete a blog from DB
router.delete("/:blog_id", middleware.checkBlogOwnership, function(req, res) {
     Blog.findByIdAndRemove(req.params.blog_id, function(err){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});



module.exports = router;
