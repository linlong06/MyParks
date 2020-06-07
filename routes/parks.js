var express         = require("express"),
    router          = express.Router(),
    Park            = require("../models/park"),
    middleware      = require("../middleware/index")

//INDEX: Show all parks
router.get("/", function(req, res){
    Park.find({}, function(err, allParks) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("parks/index", {parks: allParks});
        }
    });
});

// NEW: show form to create new park
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("parks/new"); 
});

// CREATE: add a new park to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var website = req.body.website;
    var author = {id: req.user._id, username: req.user.username};
    var newPark = {name: name, image: image, description: description, website: website, author: author};
    Park.create(newPark, function(err, newAdded){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/parks");
        }
    });
});


// SHOW: show more info about a park
router.get("/:id", function(req, res){
    Park.findById(req.params.id).populate("comments").populate("blogs").populate("photos").exec(function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            res.render("parks/show", {park: foundPark});
        }
    });
});

//EDIT: show page to update a park
router.get("/:id/edit", middleware.checkParkOwnership, function(req, res) {
     Park.findById(req.params.id, function(err, foundPark){
         if (err) {
             console.log(err);
         } else {
             res.render("parks/edit", {park: foundPark});
         }
     });
});

//UPDATE: post updated park info
router.put("/:id", middleware.checkParkOwnership, function(req, res) {
     Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, updatedPark){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});

//DELETE: delete a park from DB
router.delete("/:id", middleware.checkParkOwnership, function(req, res) {
    Park.findByIdAndRemove(req.params.id, function(err){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks");
         }
     });
});


module.exports = router;