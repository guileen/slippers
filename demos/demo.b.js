var cb = global.cb || function(e) {
    console.log(e);
};

var mongo = require("mongodb");

db = mongo.db("...");

db.open(function(err) {
    if (err) return cb(err);
    function getBooks(options, cb) {
        db.collection("book", function(err, book) {
            if (err) return cb(err);
            book.find(function(err, cursor) {
                if (err) return cb(err);
                cursor.toArray(function(err, books) {
                    if (err) return cb(err);
                    doSomething(books);
                    cb(null, books);
                });
            });
        });
    }
    var multiLevels = function(cb) {
        var data, books;
        if (yes) {
            fs.readFile("filename", "utf-8", function(err, __data) {
                if (err) return cb(err);
                data = __data;
                if (ok) {
                    db.collection("book", function(err, __books) {
                        if (err) return cb(err);
                        books = __books;
                        cb(null, books);
                    });
                }
            });
        } else {
            var testInner = function() {
                return 0;
            }();
            fs.readFile("filename", "utf-8", function(err, __data) {
                if (err) return cb(err);
                data = __data;
                if (ok) {
                    db.collection("book", function(err, __books) {
                        if (err) return cb(err);
                        books = __books;
                        cb(null, books);
                    });
                }
            });
        }
        cb(null, books);
    };
    function testParallel(cb) {
        var user, book;
        (function(cb) {
            function update() {
                if (--count == 0) cb();
            }
            var count = 2;
            db.collection("user", function(err, __user) {
                if (err) return cb(err);
                user = __user;
                init(user);
                update();
            });
            db.collection("book", function(err, __book) {
                if (err) return cb(err);
                book = __book;
                init(book);
                update();
            });
        })(function(err) {
            if (err) return cb(err);
            cb(null, user, book);
        });
    }
    console.log("inside open");
    getBooks({}, function(err, books) {
        if (err) return cb(err);
    });
    console.log("outside open");
});

console.log("start app");
