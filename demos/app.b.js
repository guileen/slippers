var __cb = global.__cb || function(e) {
    console.log(e);
};

var express = require("express"), mongo = require("mongodb"), db = mongo.db("...");

app = express.createServer();

db.open(function(__err) {
    if (__err) return __cb(__err);
    db.collection("book", function(__err, __book) {
        if (__err) return __cb(__err);
        book = __book;
        db.collection("user", function(__err, __user) {
            if (__err) return __cb(__err);
            user = __user;
            app.get("/", function(req, res) {
                book.find(function(__err, cursor) {
                    if (__err) return __cb(__err);
                    cursor.toArray(function(__err, items) {
                        if (__err) return __cb(__err);
                        res.render("book", {
                            items: items
                        });
                    });
                });
            });
            app.listen();
        });
    });
});