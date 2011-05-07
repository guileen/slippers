// just for demo and test
var mongo = require('mongodb')

db = mongo.db('...');

db.open();//{

function getBooks(options, callback){
  var err, book = db.collection('book');//{
  if(err) return callback(err);
  var err, cursor = book.find();//{
  if(err) return callback(err);
  var err, books = cursor.toArray();//{
  if(err) return callback(err);
  doSomething(books);
  callback(null, books);
}

function multiLevels(){
  var err, data, books;
  if(yes){
    err, data = fs.readFile('filename', 'utf-8');//{
    if(!err){
      err, books = db.collection('book');//{
    }
  }else{
    err, data = fs.readFile('filename', 'utf-8');//{
    if(!err){
      err, books = db.collection('book');//{
    }
  }
}

console.log('inside open');

//}

console.log('outside open');
console.log('start app');
