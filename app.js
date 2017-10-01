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

app.get("/login", function (req, res) {
    
    res.render('index');
    new Vue({
        
        template: '<div>{{ hi }}</div>'
    })

});



app.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});


