var express = require('express');
var stripe = require('stripe')('sk_test_sJbTpoe00NzzsYzCw');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req, res){
    res.render('index',{

    });
});

app.get('/paysuccess', function(req, res){
    res.render('paysuccess',{

    });
});

app.post('/charge', function(req, res){
    console.log(req.body);
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
        amount : (chargeAmount * 100),
        currency : 'aud',
        source : token,
        receipt_email : req.body.email,
        metadata: {'order_id': req.body.id}
    }, function (err, charge){
        /*if(err && err.type === "StripeCardError"){
            res.json([{'SUCCESS' : 1}]);
        }else{
            res.json([{'SUCCESS' : 1}]);
        }*/
        if(err && err.type === "StripeCardError"){
            res.json([{'SUCCESS' : 0}]);
        }else{
            res.json([{'SUCCESS' : 1}]);
        }
    });
});

app.listen(3000, function(){
    console.log('stripe is running');
});
