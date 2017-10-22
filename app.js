var express = require("express"),
    app = express(),
    path = __dirname + '/views/',
    router = express.Router(),
    bodyParser = require('body-parser');


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: false
})); // to support URL-encoded bodie


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

app.get("/uHome", function (req, res) {
    res.render('userhome');
});

app.get("/browse", function (req, res) {
    res.render('index');
});

app.get("/dashboard", function (req, res) {
    res.render('dashboard');
});


app.get("/Register", function (req, res) {
    res.render('register');
});

app.get("/uBrowse", function (req, res) {
    res.render('userbrowse');
});


app.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});


