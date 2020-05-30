// package declaration
var express             = require("express"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),    
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    User                = require("./models/user"),
    Comment             = require("./models/comment"),
    Park                = require("./models/park"),
    Blog                = require("./models/blog"),
    seedDB              = require("./seed");

var indexRoutes         = require("./routes/index"),
    parkRoutes          = require("./routes/parks"),
    commentRoutes       = require("./routes/comments"),
    blogRoutes          = require("./routes/blogs");

// express and DB configuration
var app = express();
var url = process.env.DATABASEURL || "mongodb://localhost:27017/myparks";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

//passport config
app.use(require("express-session")({
    secret: "my own secret",
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/parks", parkRoutes);
app.use("/parks/:id/comments", commentRoutes);
app.use("/parks/:id/blogs", blogRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!"); 
});