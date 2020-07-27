const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {type: String, require: true},
    ingredients: {type: String, require: true},
    imagePath: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", require: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);