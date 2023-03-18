const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const _ = require("lodash");

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://sdivjot2003:lomna3002@cluster0.sxtv3mi.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("posts", postSchema);



const hcont = "Home page        ipsum dolor sit amet consectetur adipisicing elit. Voluptas adipisci, nam iusto ut molestias cumque? Impedit dolorum harum animi ducimus quod repellendus iure explicabo"
const acont = "About page       ipsum dolor sit amet consectetur adipisicing elit. Voluptas adipisci, nam iusto ut molestias cumque? Impedit dolorum harum animi ducimus quod repellendus iure explicabo, at maxime natus et amet, quos soluta accusamus. Dolorem voluptatem ipsam, quidem dolorum nulla quasi aut odit! Nemo illo possimus rerum quia dolore dolorum eligendi et."
const ccont = "Contact us       ipsum dolor sit amet consectetur adipisicing elit. Voluptas adipisci, nam iusto ut molestias cumque? Impedit dolorum harum animi ducimus quod repellendus iure explicabo, at maxime natus et amet, quos soluta accusamus. Dolorem voluptatem ipsam, quidem dolorum nulla quasi aut odit! Nemo illo possimus rerum quia dolore dolorum eligendi et."

var posts = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    Post.find({}, function (err, posts) {
        res.render("home", {
            homec: hcont,
            posts: posts
        });
    });
});

app.get("/about", function (req, res) {
    res.render("about", { aboutc: acont });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactc: ccont });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.get("/posts/:post", function (req, res) {
    let request = req.params.post;
    Post.findOne({ _id: request }, function (err, post) {
        res.render("posts", {
            title: post.title,
            content: post.content
        });

    });
});

app.post("/compose", function (req, res) {
    const newpost = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    newpost.save();
    posts.push(newpost);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});