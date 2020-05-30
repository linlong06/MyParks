var Park            = require("../models/park"),
    Comment         = require("../models/comment"),
    Blog         = require("../models/blog");
    
var middlewareObj = {};

middlewareObj.checkParkOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Park.findById(req.params.id, function(err, foundPark){
            if (err) {
                req.flash("error", "Park not found!");
                res.redirect("back");
            } else if (foundPark.author.id.equals(req.user._id)) {
                return next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to log in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else if (foundComment.author.id.equals(req.user._id)) {
                return next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to log in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkBlogOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.blog_id, function(err, foundBlog){
            if (err) {
                req.flash("error", "Blog not found!");
                res.redirect("back");
            } else if (foundBlog.author.id.equals(req.user._id)) {
                return next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to log in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to log in to do that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;