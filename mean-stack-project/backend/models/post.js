const mongoose = require('mongoose');

//define db schema structure below. schema is just a blueprint
const postSchema = mongoose.Schema({
title : {type:String, required:true},
content : {type:String, required:true},
imagePath : {type:String, required:true},
});
 //to actually create data, turn above blueprint into a model:
 module.exports= mongoose.model('Post',postSchema);

