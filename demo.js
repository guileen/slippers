// just for demo and test
var mongo = require('mongodb')

db = mongo.db('...');

db.open(_);

function getBooks(options){//{
  var book = db.collection('book', _);
  var cursor = book.find(_);
  var books = cursor.toArray(_);
  doSomething(books);
  return books;//{
}

function multiLevels(){//{
  var data, books;
  if(yes){
    data = fs.readFile('filename', 'utf-8', _);
    if(ok){
      books = db.collection('book', _);
      return books;//{
    }
  }else{
    data = fs.readFile('filename', 'utf-8', _);
    if(ok){
      books = db.collection('book', _);
      return books;//{
    }
  }
  return books;//this is wrong, out of indent;
}

console.log('inside open');

//}

console.log('outside open');
console.log('start app');
