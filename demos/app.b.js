var cb = global.cb || function(e) {
    console.log(e);
};

var express = require("express"), mongo = require("mongodb"), db = mongo.db("...");

app = express.createServer();

db.open(function(err) {
    if (err) return cb(err);
    var book, user;
    (function(cb) {
        function update() {
            if (--count == 0) cb();
        }
        var count = 2;
        db.collection("book", function(err, __book) {
            if (err) return cb(err);
            book = __book;
            update();
        });
        db.collection("user", function(err, user) {
            if (err) return cb(err);
            user = __user;
            update();
        });
    })(function(err) {
        if (err) return cb(err);
        app.get("/", function(req, res) {
            book.find(function(err, cursor) {
                if (err) return cb(err);
                cursor.toArray(function(err, items) {
                    if (err) return cb(err);
                    res.render("book", {
                        items: items
                    });
                });
            });
        });
        app.listen();
    });
});
