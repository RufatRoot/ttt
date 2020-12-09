var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")


mongoose.connect("mongodb://mongo:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Yellow Bricks", 
//         image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg",
//         description: "This is a huge granite"
//     }, 
//         function(err, campground){
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log("NEWLY CREATED CAMPGROUND: ");
//                 console.log(campground)
//             }
// });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
//     {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
//     {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
//     {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamground = {name: name, image: image, description: desc}
    Campground.create(newCamground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    let datime = new Date();
    console.log("The YelpCamp Server Has Started " + "at - " , datime.toLocaleString('en-US', { timeZone: 'Asia/Baku' }))
});