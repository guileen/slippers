Slippers
========

Nodejs with slippers, confortable like wearing slippers, but INFORMAL, **JUST FOR FUN**.

Slippers is inspired by [streamlinejs](https://github.com/Sage/streamlinejs) and [Jscex](https://github.com/JeffreyZhao/jscex).
If you really need this feature,
please try [streamlinejs](https://github.com/Sage/streamlinejs) or [Jscex](https://github.com/JeffreyZhao/jscex)

You just need end with a `//{` on the async call, you can got the magic.

Usage
========

run `npm install slippers`

edit test.js

```javascript
var data = fs.readFile(filename, 'utf-8');//{
console.log(data);
```

run `slippers test.js`

```javascript
var __cb=global.__cb || function(e){console.log(e)};fs.readFile(filename, 'utf-8', function(__err,data ){if(__err)return __cb(__err);
console.log(data);
});
```

You can use `//}` for manually end up the async block if you want.

**See [demo.js](https://github.com/guileen/slippers/blob/master/demo.js) for more information.**

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
