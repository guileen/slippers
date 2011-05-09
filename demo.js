// just for demo and test
var mongo = require('mongodb')

db = mongo.db('...');

db.open(_);

function getBooks(options, _){
  var book = db.collection('book', _);
  var cursor = book.find(_);
  var books = cursor.toArray(_);
  doSomething(books);
  return books;
}

var multiLevels = function(_){
  var data, books;
  if(yes){
    data = fs.readFile('filename', 'utf-8', _);
    if(ok){
      books = db.collection('book', _);
      return books;
    }
  }else{
    var testInner = (function(){
        return 0;
    })();
    data = fs.readFile('filename', 'utf-8', _);
    if(ok){
      books = db.collection('book', _);
      return books;
    }
  }
  return books;//this is wrong, out of indent;
}

function testParallel(_){
  var user, book;
  parallel{
    user = db.collection('user', _);
    init(user);
    book = db.collection('book', _);
    init(book);
  }
  return  user, book;
}

console.log('inside open');

var books = getBooks({}, _);
//}
console.log('outside open');
//}
console.log('start app');
