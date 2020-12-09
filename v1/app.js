var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")


mongoose.connect("mongodb://mongo:27017/yelp_camp");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Salmon Creek", 
        image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground)
        }
});

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
    {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
    {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_960_720.png"},
    {name: "Mointain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCamground = {name: name, image: image}
    campgrounds.push(newCamground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    let datime = new Date();
    console.log("The YelpCamp Server Has Started " + "at - " , datime.toLocaleString('en-US', { timeZone: 'Asia/Baku' }))
});