//Imports 
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const methodOverride = require("method-override");
const Book = require("./models/book");

//Import mongoose model 
const book = require("./models/book")
//Configurations 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
//Configurate view engine 
app.set('view engine', 'ejs')

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.listen(process.env.PORT, ()=> console.log('server is running on port: '+ process.env.PORT))

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
app.get("/", (req, res) => {
    res.render("index");
});
  // ROLE -> render a form (new.ejs)
  app.get("/books/new", (req, res) => {
    res.render("books/new");
  });

//SHOW ROUTE 
app.get("/books/:id", async (req, res) => {
  try {
    const foundBook = await book.findById(req.params.id);
    // const variable = await Model.findById()
    const contextData = { book: foundBook };
    res.render("books/show", contextData);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//GET 
app.get("/books", async (req, res) => {
  try {
    const allBooks = await book.find();
    res.render("books/index", { books: allBooks, message: "Hello Friend" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//POST 
app.post("/books", async (req,res) => {
  if (req.body.isBookGood) {
    req.body.isBookGood = true;
  } else {
    req.body.isBookGood = false;
  }

  try {
    await book.create(req.body);
    res.redirect("/books");
  } catch (err){
    res.status(400).json({error:err.message});
  }
});

//Delete Route 
app.delete("/books/:id", async (req, res) => {
  try {
    await book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.redirect("/books");
  }
});

//EDIT ROUTE
app.get("/books/:bookId/edit", async (req, res) => {
  try {
    const bookToEdit = await book.findById(req.params.bookId);
    res.render("books/edit", { book: bookToEdit });
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

//UPDATE ROUTE 
app.put("/books/:id", async (req, res) => {
  try {
    if (req.body.isBookGood === "on") {
      req.body.isBookGood = true;
    } else {
      req.body.isBookGood = false;
    }

    await book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/books/${req.params.id}`);
  }
});
