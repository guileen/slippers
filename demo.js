// just for demo and test
var mongo = require('mongodb')

db = mongo.db('...');

db.open();//{

function getBooks(options){//{
  var book = db.collection('book');//{
  var cursor = book.find();//{
  var books = cursor.toArray();//{
  doSomething(books);
  return books;//{
}

function multiLevels(){//{
  var data, books;
  if(yes){
    data = fs.readFile('filename', 'utf-8');//{
    if(ok){
      books = db.collection('book');//{
      return books;//{
    }
  }else{
    data = fs.readFile('filename', 'utf-8');//{
    if(ok){
      books = db.collection('book');//{
      return books;//{
    }
  }
  return books;//this is wrong, out of indent;
}

console.log('inside open');

//}

console.log('outside open');
console.log('start app');
