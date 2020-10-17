const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/app", {useNewUrlParser: true, useUnifiedTopology: true});

const post = mongoose.model('post', {files: Array, comment: String, user: String})
const file = new post({files: ["xyz.html"], comment: "who der?", user: "xyz"});

file.populate()
file.update()
//file.save().then(()=>console.log("file saved"),()=>console.log("file not saved"));