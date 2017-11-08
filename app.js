var express = require("express"),
app = express(),
path = __dirname + '/views/',
router = express.Router(),
bodyParser = require('body-parser');
var admin = require("firebase-admin");




var admin = require("firebase-admin");


admin.initializeApp({
credential: admin.credential.cert({
"type": "service_account",
"project_id": "caloriemeter-79b5f",
"private_key_id": "40a7c1d0eadc3cf500719cabeb5d3079045cb336",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCuARnxmmi3kZT\nPNHoAuiBQDfg1GA2U4V3Ud+EVNPwqCynZN2hwBJNUfqKL1fLWMmPRtJj1AMUVO8Z\n7yrPQJVIUjoHR4Fx/HkXIe7UslJg1qMwg9r1+iFVwiOYy42qxGPNk40T/Z+5Xwoh\n0dWU0XPZIqfDAnLE9kyB0jLtU32ahJL4tbfMa8b0Fno9fGl1vyCLEvTQft8oHd5V\nTyRguPqQSYnPjf7XJY8ApyGUIQbIbIe0F1KX2TM5295f7HUfTkIy6LTo0J0N6Wgs\nljfPKD1FU8HVNt3Ly6f0XNr4Bylg00WuExMkUb3veA/b1vnXFpOV9dbQYHfokjV3\nl7oKs/kjAgMBAAECggEAAk4g8cSoyq0LEReoR/a+TgEN8QYioIwzw4XoBTEszm2a\nK4ybvLtBPx9cplzJNihNbpFj2IPjFCxQVCciYJBh2d54bXz/XIqwfwdLOMMg9BT9\nsjoFY7lHfJFgld7PxQqMzBtKwsaZHSmOvUlNzGjovsjr7W0LxFVCrLOvfO7HyR2h\nTNM1EFOTVeTl710OQB3V53MZ1bbHKt2cBF/f7fClwCAsggqY6Y1l8E08fF4fugZr\nVPp73hI15QHY/u+C7m34TXHLK/ocThi0lV1VsqPAI+KoqZJOjR0ozscedmQnvAzH\nHqTIAkGkOTObDVh0R2fik2rfjNsI26y5NJt1lFeipQKBgQDkp6pYOFZi80XfrNKx\nnhjEKqKi9keddXFozUPtSz3HuejRpNAo4AlNJUjw2rTkkRUGEOzSVIPxanP1ifgP\nOJwDhNY98FPLUjm9fl5StfGXjnxNM1KJ4aBn4njwNQGyUsu0irEM72gGUnyLJHf3\nvTqHcaOp8Guk5+mt70hecjjWtwKBgQDaAWNMS4HsHp0Y4aeruipdsULTvFkC2qgl\n/NLT283CaaM8d8QqS1s8klhdwkPVQe1eOyBDZfAEaWZg82xZvgY/LFK4+jG02pBC\n+gPU2WJdLy0u4DvJC3whTMBeG4929QYdvWoeKTW/nSirJGOd029g2v9xOE+vsDZf\n44Sk1glk9QKBgQC+k5xgATzHJlpDrojBb7LWtW5ugvR3oa5Pml4WRpMMh8AsE8FH\ngEtgWEYuMSt6Ig4yyyKHv9dk/MP/j+oHzbgDGtFyOH+uxC7J6Kx3JZxiJGkn8zHF\nKCAI1fLUymlKlsWgCcS9skCynEeftVqkSrygrS+q8W7WuFDFHt3jkjIbiwKBgDiL\n2ZzFjRqYyjjU9y/E5w5MV0Aif5gM7UaFMI5BWjqOOggKLLinuS+Z6g/PvtaG9jHV\n9kVlIH+Uczi8iyMv9eDW91IBm3kEpByrSukfxbLT9M1O3lMEhpsAlHkUfv7lCUQX\niHnwSH++HPlfQ/OBD0e5Jj7Q02KHu2Ld2d8DoYYtAoGBAKlBhx5jRmCxxdd5pZyr\nswFisnT5QAVVS28aKR2TvedIaNQw+Q6Vl1nt/CD0h4GpkyXEBJdGbfKQ5/gWtkdA\n7Gvrd6CZviq2RR1eSX+y0bGmJwsaG9wR5wHsGRW8qHUhZLmNJAYRZ7u4gWWBUO5+\n9W/30NL/jRRyNHV3jmEYntHZ\n-----END PRIVATE KEY-----\n",
"client_email": "firebase-adminsdk-6pr99@caloriemeter-79b5f.iam.gserviceaccount.com",
"client_id": "100201114322901030200",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://accounts.google.com/o/oauth2/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6pr99%40caloriemeter-79b5f.iam.gserviceaccount.com"
}),
databaseURL: "https://caloriemeter-79b5f.firebaseio.com"
});



// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();


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

var letter= req.query.query;
if (letter==undefined)
    letter = 'A'


var ref = db.ref("/data");
ref.once("value", function(snapshot) {
    var itemCollection=[];

    snapshot.forEach(function (childSnapshot) {

        if(childSnapshot.key.startsWith(letter.toUpperCase())){
        itemCollection.push({
            name:childSnapshot.key,
            carbohydrate:childSnapshot.val().carbohydrate,
            fat:childSnapshot.val().fat,
            calories:childSnapshot.val().calories,
            protein:childSnapshot.val().protein
        });
    }

        });

        if(itemCollection.length==0){
            res.render('browse',{res:"No"});
        }else{
            res.render('browse',{res:itemCollection});
        }

        
        
    });





});



app.post("/addUserItem", function(req,res){
    var item =req.body.itemname;
    var fat=req.body.fat;
    var protein =req.body.protein;
    var carbs =req.body.carbs;
    var cal =req.body.calories;

    var uid =req.body.uid;
    
    console.log(item+ " "+fat+ " "+protein+ " "+carbs+ " "+cal+" "+uid);
    res.send('/dashboard');


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


