//Imports 
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Middleware

//APP + Configurations 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Opens connection MongoDB 
mongoose.connect(process.env.MONGODB_URI);

//Mongoose connection event listeners 
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });

  // Landing Page - Home page
// ROLE - provide information about the app / site
app.get("/test", (req, res) => {
    res.render("Server is Running");
  });

  app.listen(3000, () => {
    console.log("Server is running")
  })

  app.get("/",async (req,res) => {
    res.render("index.ejs")
  })
  // New book Route - GET - /fruits/new
  // ROLE -> render a form (new.ejs)
  app.get("/books/new", (req, res) => {
    res.render("books/new.ejs");
  });

//Create Route 
  app.use(express.urlencoded({ extended: false }));

app.post("/books", async (req, res) => {
    console.log(req.body);
    res.redirect("/books/new");
  });
app.post("/books", async (req, res) => {
    if (req.body.isBookGood === "on") {
      req.body.isBookGood = true;
    } else {
      req.body.isBookGood = false;
    }
    await Book.create(req.body);
    res.redirect("/books/new");
  });

