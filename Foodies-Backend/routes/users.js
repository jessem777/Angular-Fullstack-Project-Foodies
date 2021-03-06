const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/* POST users listing. */
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
          if(!user) {
              return res.status(401).json({
                  message:'Sorry your username is invalid'
              });
          }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password);
      })
      .then( result => {
          if(!result){
              return res.status(401).json({
                  message:'Sorry your passwor is invalid'
              });
          }
          const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 
              "secret_used_to_validate_hashes_stored_on_the_server", 
              {expiresIn: "1h"}
              );
              console.log(token);
              res.status(200).json({
                  token: token,
                  expiresIn: 3600,
                  userId: fetchedUser._id
              });
          })
      .catch(err => {
          console.log(err);
          return res.status(401).json({
              message:'Auth error'
          });
      });
  }); 

module.exports = router;
