var express = require('express');
var multer = require('multer');
//allows us to make a multipart form
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');
var ejsLayouts = require('express-ejs-layouts');
require('dotenv').config()
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res) {
  res.render('index', {images, cloudinary});
});

app.post('/', upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    images.push(result.public_id);
    res.redirect('/');
  });
});

app.listen(3000);
