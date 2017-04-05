var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var config = {
    
    user: 'sanattaori',
    database: 'sanattaori',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.PASSWORD
    
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//////////////////////////////////////////////////////

const decipher = crypto.createDecipher('aes192', 'a password');

let decrypted = '';
decipher.on('readable', () => {
  const data = decipher.read();
  if (data)
    decrypted += data.toString('utf8');
});
decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
decipher.write(encrypted, 'hex');
decipher.end();

//////////////////////////////////////////////////////


function hash(input,salt) {
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","1000",salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-random-string');
    res.send(hashedString);
});

app.post('/create-user-n',function(req,res){
//username,password 
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = cryptorandomBytes(128).toString('hex');
    var dbstring = hash(password,salt);
    pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('User successfully created: '+ username);
        }
        
    });

    
});


var pool = new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test ', function(err,result){
        if (err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
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
