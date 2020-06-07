var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Photo            = require("../models/photo"),
    Park            = require("../models/park"),
    middleware      = require("../middleware/index")

//===============
// Photos ROUTEs
//===============

router.get("/new", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            res.render("photos/new", {park: foundPark});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, foundPark){
        if (err) {
            console.log(err);
        } else {
            Photo.create(req.body.photo, function(err, addedPhoto){
                if (err) {
                    console.log(err);
                } else {
                    // add username and ID to Photo
                    addedPhoto.author.id = req.user._id;
                    addedPhoto.author.username = req.user.username;
                    addedPhoto.save();
                    foundPark.photos.push(addedPhoto);
                    foundPark.save();
                    res.redirect("/parks/" + foundPark._id);                    
                }
            });
        }
        
    });
});


//EDIT: show page to update a photo
router.get("/:photo_id/edit", middleware.checkPhotoOwnership, function(req, res) {
     Photo.findById(req.params.photo_id, function(err, foundPhoto){
         if (err) {
             console.log(err);
         } else {
             res.render("photos/edit", {park_id: req.params.id, photo: foundPhoto});
         }
     });
});

//UPDATE: post updated photo info
router.put("/:photo_id", middleware.checkPhotoOwnership, function(req, res) {
     Photo.findByIdAndUpdate(req.params.photo_id, req.body.photo, function(err, updatedPhoto){
         if (err) {
             console.log(err);
         } else {
             res.redirect("/parks/" + req.params.id);
         }
     });
});

//DELETE: delete a photo from DB
router.delete("/:photo_id", middleware.checkPhotoOwnership, function(req, res) {
     Photo.findByIdAndRemove(req.params.photo_id, function(err){
         if (err) {
             console.log(err);
             res.redirect("/parks/" + req.params.id);
         }
     });
});



module.exports = router;
