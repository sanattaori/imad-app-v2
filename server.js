var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/tes-dbt',function(req, res){
    
}); 

app.get('/maps', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'maps.html'));
});

app.get('/voice', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'voice.html'));
});



var counter = 0;
app.get('/counter', function (req, res){
    counter = counter +1;
    res.send (counter.toString());
    
});


app.get('/ui/particle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'particle.js'));
});

app.get('/ui/app.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'app.js'));
});

var names=[];
app.get('/submit-name', function (req, res) {
  var name= req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});


app.get('/article-one', function (req, res){
    res.send('Artical one requested');
    
});

app.get('/article-two', function (req, res){
  res.send(createTemplate(articleOne));
    
});

app.get('/article-three', function (req, res){
    res.send('Artical three requested');
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/typed.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'typed.js'));
});

app.get('/ui/magic.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'magic.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
