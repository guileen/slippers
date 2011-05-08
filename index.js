/**
 * It is not a really compiler, so you must pay attention to code style.
 *
 * {} must be pairs, even in block comments.
 *
 * close block in a single line without expression. e.g. `foo.bar();}` is wrong
 * close ONE block in ONE line, e.g. ` });});` is wrong , `}}` is wrong.
 */
var ex_async  = /^(\s*)((var\s)?([^=]+)=\s*)?(.*\(\s*)([^\)]*)\b_\b\s*\);?(.*)/,
    ex_fn     = /^(.*[\(\s=:&|]?function(?:\s[^\(]*|)\(\s*)([^\)]*)\b_\b(\s*\)\s*\{.*)/,
    ex_nor_fn = /^.*[\(\s=:&|]?function(?:\s[^\(]*|)\(\s*[^\)]*\)\s*\{.*/,
    ex_return = /^(.*[\s\{&|])?return\s+([^;]*)(.*)/;

function getDeltaBlocks(line){
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
      blocks = [],
      block_level = 0,
      results = [],
      in_async = true,
      line, deltaBlocks, block_level, last_block_level, block;

  function parse_async(){
    var m = ex_async.exec(line);
    if(m){
      ++block.level;
      var indent = m[1],
          assignment = m[2],
          local = m[3],
          cb_args = m[4],
          foo = m[5],
          args = m[6],
          tail = m[7],
          cb = 'function(__err' + (assignment && ', ' || ''),
          errHandler = '){if(__err)return __cb(__err);';

      if(assignment){
        if(local){
          cb += cb_args.trim();
          cb += errHandler;
        } else {
          cb += cb_args.replace(/[^\s,]+/g, '__$&').trim();
          cb += errHandler;
          cb += cb_args.replace(/[^\s,]+/g, '$&=__$&');
          cb += ';';
        }
      }else{
        cb += errHandler;
      }
      results.push( indent + foo + args + cb + tail);
    }
    return !!m;
  }

  function parse_default(){
    if(deltaBlocks[0] || i == len-1){
      var close = ''
      while(blocks[last_block_level].level-- > 0) close += '});';
      // only 1 block will be fully closed. so don't put 2 close } in 1 line.
      blocks[last_block_level].level = 0;
      line = line.replace(/^\s*/, '$&' + close);
    }
    if(block.level > 0 && /\/\/\s*}/.test(line)){
      line = line.replace(/^\s*/,'$&'+'});');
      block.level--;
    }
    results.push(line);
  }

  function parse_fn(){
    var m = ex_fn.exec(line);
    if(m){
      in_async = true;
      var prefix = m[1],
          args = m[2].trim(),
          suffix = m[3];
      results.push(prefix + args + (args && ' ') + '__cb' + suffix);
    } else if(ex_nor_fn.test(line)){
      in_async = false;
    }
    return !!m;
  }

  function parse_return(){
    var m = ex_return.exec(line);
    if(m && in_async){
      var prefix = m[1],
          cb_args = m[2],
          suffix = m[3];
      results.push((prefix || '') + '__cb(null' + (cb_args && ',') + cb_args + ')' + suffix);
      return true;
    }
    return false;
  }

  for(; i< len; i++){
    line = lines[i];
    deltaBlocks = getDeltaBlocks(line);
    last_block_level = block_level;

    block_level += deltaBlocks[1];
    block = blocks[block_level] || (blocks[block_level] = {
        level: 0
    });

    parse_fn() || parse_async() || parse_return() || parse_default();

  }
  results[0] = 'var __cb=global.__cb || function(e){console.log(e)};' + results[0];
  return results.join('\n');
}

exports.command = function command(){
  var fs = require('fs');
  fs.readFile(process.argv[2], 'utf-8', function(err, data){
      console.log(compile(data));
  });
}
