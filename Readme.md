Slippers
========

Nodejs with slippers, confortable like wearing slippers, but INFORMAL, **JUST FOR FUN**.

Slippers is inspired by [streamlinejs](https://github.com/Sage/streamlinejs) and [Jscex](https://github.com/JeffreyZhao/jscex).
If you really need this feature,
please try [streamlinejs](https://github.com/Sage/streamlinejs) or [Jscex](https://github.com/JeffreyZhao/jscex)

You just need end with a `_` in the async call, you can got the magic.

Usage
========

run `npm install slippers`

edit test.js

```javascript
var data = fs.readFile(filename, 'utf-8', _);
console.log(data);
```

run `slippers test.js`

```javascript
var cb=global.cb || function(e){console.log(e)};fs.readFile(filename, 'utf-8', function(err,data ){if(err)return cb(err);
console.log(data);
});
```

**See [demo.js](https://github.com/guileen/slippers/blob/master/demo.js) and [demo.out.js](https://github.com/guileen/slippers/blob/master/demo.out.js) for more information.**

function define
--------

```javascript
function foo(args, _){
  return bar1, bar2;
}
// compile to =>
function foo(args, callback){
  callback(null, bar1, bar2);
}
```

parallel
--------

```javascript
var bar1, bar2, bar3, bar4;
parallel{
  bar1, bar2 = foo(args, _);
  bar3, bar4 = foo(args, _);
}
console.log(bar1 + bar2 + bar3 + bar4);
// compile to =>
var bar1, bar2, bar3, bar4;
(function(cb){
  function update(){
    if(--count==0) cb()
  }

  var count=2;

  foo(args, function(err, __bar1, __bar2){
    if(err)return cb(err);
    bar1=__bar1, bar2=__bar2;
    update();
  });

  foo(args, function(err, __bar3, __bar4){
    if(err)return cb(err);
    bar3=__bar3, bar4=__bar4;
    update();
  });

})(function(err){

  if(err)return cb(err);
  console.log(bar1 + bar2 + bar3 + bar4);

});

```

You can use `//}` for manually end up the async block if you want.

Map line-num for debug?
--------
No need, the compiled js keep the same line number with source.

Note
--------

1. It is not a really compiler, so you must pay attention to code style.
  * {} must be pairs, even in block comments.
  * close block in a single line without expression. e.g. `foo.bar();}` is wrong
  * close ONE block in ONE line, e.g. ` });});` is wrong , `}}` is wrong.

1. You should not use slippers in projects, the syntax are not stable yet, it's just an experiment for now.
1. It's welcome to let me know your idea on [issue pages](https://github.com/guileen/slippers/issues).
