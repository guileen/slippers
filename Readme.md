Slippers
========

Nodejs with slippers, confortable like wearing slippers.

Slippers is inspired by streamline.js and Jscex.

You just need end with a `//{` on the async call, you can got the magic.

edit test.js

```javascript
var err, data = fs.readFile(filename, 'utf-8');//{
console.log(data);
```

    > slippers test.js

```javascript
fs.readFile(filename, 'utf-8', function(err, data ){
console.log(data);
});
```

You can use `//}` for manually end up the async call if you want.

**See demo.js for more information.**

Map line-num for debug?
--------
No need, the compiled js keep the same line number with source.

Note
--------
It is not a really compiler, so you must pay attention to code style.

 * {} must be pairs, even in block comments.
 * close block in a single line without expression. e.g. `foo.bar();}` is wrong
 * close ONE block in ONE line, e.g. ` });});` is wrong , `}}` is wrong.
