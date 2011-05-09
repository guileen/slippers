var __cb=global.__cb || function(e){console.log(e)};// just for demo and test
var mongo = require('mongodb')

db = mongo.db('...');

db.open(function(__err){if(__err)return __cb(__err);

function getBooks(options, __cb){
  db.collection('book', function(__err, book){if(__err)return __cb(__err);
  book.find(function(__err, cursor){if(__err)return __cb(__err);
  cursor.toArray(function(__err, books){if(__err)return __cb(__err);
  doSomething(books);
  __cb(null,books);
});});});}

var multiLevels = function(__cb){
  var data, books;
  if(yes){
    fs.readFile('filename', 'utf-8', function(__err, __data){if(__err)return __cb(__err);data=__data ;
    if(ok){
      db.collection('book', function(__err, __books){if(__err)return __cb(__err);books=__books ;
      __cb(null,books);
    });}
  });}else{
    var testInner = (function(){
        return 0;
    })();
    fs.readFile('filename', 'utf-8', function(__err, __data){if(__err)return __cb(__err);data=__data ;
    if(ok){
      db.collection('book', function(__err, __books){if(__err)return __cb(__err);books=__books ;
      __cb(null,books);
    });}
  });}
  __cb(null,books);//this is wrong, out of indent;
}

function testParallel(__cb){
  var user, book;
  (function(__cb){function __update(){if(--__count==0)__cb()}var __count=2;
    db.collection('user', function(__err, __user){if(__err)return __cb(__err);user=__user ;
    init(user);__update();
    });db.collection('book', function(__err, __book){if(__err)return __cb(__err);book=__book ;
    init(book);__update();
  });})(function(__err){if(__err)return __cb(__err);
  __cb(null,user, book);
});}

console.log('inside open');

getBooks({}, function(__err, books){if(__err)return __cb(__err);
});//}
console.log('outside open');
});//}
console.log('start app');

