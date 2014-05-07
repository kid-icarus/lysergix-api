var express = require('express');
var faces = require('lysergix');
var app = express();

app.get('/api/v1/faces', function(req, res){
  res.send(faces);
});

app.get('/api/v1/faces/:index', function(req, res){
  if (parseInt(req.params.index) !== parseInt(req.params.index)) {
    res.send(404, 'Error: use an integer for face ID plz');
  }
  try {
    var face = faces.getFace(parseInt(req.params.index));
  }
  catch (e) {
    res.send(404, e)
  }
  res.send(face);
});

app.get('/api/v1/tags', function(req, res){
  res.send(faces.getTags());
});

app.get('/api/v1/tagged/:tag', function(req, res){
  res.send(faces.tagFilter(req.params.tag));
});

app.get('/api/v1/random', function(req, res){
  var face = faces.getRandomFace();
  if (req.headers.accept === 'text/plain') {
    res.send(face.content + '\n');
  }
  res.send(face);
});

app.get('/api/v1/random/:tag', function(req, res){
  try {
    var face = faces.getRandomFace(req.params.tag);
  }
  catch (e) {
    res.send(404, e)
  }
  if (req.headers.accept === 'text/plain') {
    res.send(face.content + '\n');
  }
  res.send(face);
});

app.listen(1337);
