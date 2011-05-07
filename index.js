/**
 * It is not a really compiler, so you must pay attention to code style.
 *
 * {} must be pairs, even in block comments.
 *
 * close block in a single line without expression. e.g. `foo.bar();}` is wrong
 * close ONE block in ONE line, e.g. ` });});` is wrong , `}}` is wrong.
 */

/*
 ^\s*
 ((var )?([^=]*)=)?     // var err, data =
 (.*\()                 // foo().readAsync(
 ([^\)]*)               // filename, options
 (\)\s*;?)              // )
 \s*\/\/\{\s*$/         // //{
*/
var ex = /^(\s*)((var\s)?([^=]+)=\s*)?(.*\(\s*)([^\)]*)(\s*\)\s*;?)\s*\/\/\{/

function getBlocks(line){
  var close=false,levels = 0;
  //remove line comment and escape
  line = line.replace(/(\/\/.*|\\.)/g,'');
  //remove string and regex
  line = line.replace(/('[^']'|\/[^\/]*\/)/g,'');
  for(var i=0;i<line.length;i++){
    if(line[i] === '{')
      levels++;
    else if(line[i] === '}')
      levels--;
    if(levels<0){
      close = true;
    }
  }
  return [close, levels];
}

function compile(codes){
  var lines = codes.replace('\r\n', '\n').split('\n'),
      len=lines.length,
      i=0,
      levels = [],
      block = 0,
      results = [];

  for(; i< len; i++){
    var line = lines[i],
        deltaBlocks = getBlocks(line),
        last_block = block,
        m = ex.exec(line);

    block += deltaBlocks[1];

    if(m){
      levels[block] = (levels[block]||0) + 1;
      var indent = m[1],
          assignment = m[2],
          local = m[3],
          cb_args = m[4],
          foo = m[5],
          args = m[6],
          cb = ( args && ',' ) + ' function(';

      if(assignment){
        if(local){
          cb += cb_args;
          cb += '){';
        } else {
          cb += cb_args.replace(/[^\s,]+/g, '__$&');
          cb += '){';
          cb += cb_args.replace(/[^\s,]+/g, '$&=__$&');
          cb += ';';
        }
      }else{
        cb +='){';
      }
      results.push( indent + foo + args + cb);
    }
    else{
      if(deltaBlocks[0] || i == len-1){
        var close = ''
        while(levels[last_block]-- > 0) close += '});';
        // only 1 block will be fully closed. so don't put 2 close } in 1 line.
        levels[last_block] = 0;
        line = close + line;
      }
      if(levels[block] > 0 && /\/\/\s*}/.test(line)){
        line = '});' + line;
        levels[block]--;
      }
      results.push(line);
    }
  }
  return results.join('\n');
}

exports.command = function command(){
  var fs = require('fs');
  fs.readFile(process.argv[2], 'utf-8', function(err, data){
      console.log(compile(data));
  });
}
