var express = require("express"),
    app = express(),
    path = __dirname + '/views/',
    router = express.Router(),
    bodyParser = require('body-parser');
    mysql = require("mysql");
    keypress = require('keypress');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: false
})); // to support URL-encoded bodie


var con = mysql.createConnection({
  host: "localhost",
  user: "project",
  password: "project",
  database: "calorie_mate"
});

con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      process.exit(1);
      return;
    }
    console.log('Connection established');
});

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));
app.set('views', path);
app.set('view engine', 'ejs');



app.get("/", function (req, res) {
    res.render('index');
});

app.get("/home", function (req, res) {
    res.render('index');
});

app.get("/browse", function (req, res) {
    res.render('index');
});
app.get("/Register", function (req, res) {
    res.render('register');
});
app.get("/Login", function (req, res) {
    res.render('login');
});
app.get("/ForgotPassword", function (req, res) {
    res.render('forgotpassword');
});

app.get("/login-form-validate", function(req, res){
    console.log('Checking credentials');
    var form = req.body;
    console.log(form)
    // var user = form.username.value;
    // var p/assword = form.password.value;
    var user = 'Shyam';
    var password = '12345678';
    var table = null;
    con.query("SELECT password FROM USERS WHERE username = " + user.toString(),function(err,value){
        if(err) 
            console.log("User doesn't exists");
        if (value != password)
            console.log("Username and passwird doesn'n match");
        table = user.toUpperCase();
        res.render('home');
      }
    );
    
});

app.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
    keypress(process.stdin);    
    /*console.log('Press Q or Y to exit');
    process.stdin.on('keypress', function (ch, key) {
        if (key && (key.name == 'q' || key.name == 'y' )) {
            process.exit(0);
        }
    });*/
});


