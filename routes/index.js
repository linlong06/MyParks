var express         = require("express"),
    router          = express.Router(),
    passport        = require("passport"),
    User            = require("../models/user")

// MAIN ROUTES
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/game", function(req, res){
    res.render("game");
});

router.get("/quiz", function(req, res){
    res.render("quiz");
});

//===============
// AUTH ROUTEs
//===============

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to MyParks " + user.username);
                res.redirect("/parks");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/parks",
    failureRedirect: "/login"}), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have successfully logged out!");
    res.redirect("/parks");
});

module.exports = router;