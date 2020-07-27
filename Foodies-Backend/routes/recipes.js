const Recipe = require("../models/recipe");
const checkAuth = require('../middleware/check-auth');
const express = require("express");
const multer = require("multer");
const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "./images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

router.post("", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
          const url = req.protocol + "://" + req.get("host");
          const imagePath = url + "/images/" + req.file.filename
          const recipe = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            imagePath: imagePath,
            creator: req.userData.userId
          });
          recipe.save().then(createdRecipe => {
            res.status(201).json({
              message: "Post added successfully",
              recipe: {
                ...createdRecipe,
                id: createdRecipe._id
              }
            });
          });
        });

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
      }
    const recipe = new Recipe ({
            _id: req.body.id,
            title: req.body.title,
            ingredients: req.body.ingredients,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        console.log(recipe);
        Recipe.updateOne({_id: req.params.id, creator: req.userData.userId}, recipe ).then(result => {
            if (result.nModified > 0){
                res.status(200).json({message: ' recipe has been updated'})
            }else {
                res.status(401).json({message: 'not Authorized'})
            }
            
        });
    });


router.get("", (req, res, next) => {
    Recipe.find().then((documents) => {
        res.status(200).json({
            message: "Recipe have loaded",
            recipes: documents
            });
        }); 
    });

router.get("/:id", (req, res, next) => {
        Recipe.findById(req.params.id).then(recipe => {
            if (recipe) {
                res.status(200).json(recipe);
            }else {
                res.status(404).json({message: "recipe not found"})
            }
        })
    })

router.delete("/:id", checkAuth, (req, res, next) => {
        Recipe.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
          console.log(result);

        if (result.n > 0) {
            res.status(200).json({message: 'Recipe deleted' });
        }else {
            res.status(200).json({message: 'not Authorized' });
        }
        
        });
    });

module.exports = router