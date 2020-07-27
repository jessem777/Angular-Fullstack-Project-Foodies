const express = require('express');
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//use mongoose to connect to your database (I used mongoDB)
mongoose.connect("")
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(() => {
        console.log('Connection faild!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("./images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});



app.use('/recipes', recipeRoutes);
app.use('/user', userRoutes);

module.exports = app; 
