var express = require('express'),
    mongo = require('mongodb'),
    db = mongo.db('...');

app = express.createServer();

db.open(_);
book = db.collection('book', _);
user = db.collection('user', _);

app.get('/', function(req,res){
    var cursor = book.find(_)
    var items = cursor.toArray(_);
    res.render('book', {items: items});
});

app.listen();
