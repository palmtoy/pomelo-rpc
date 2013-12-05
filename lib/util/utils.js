var exp = module.exports;

// control variable of func "myPrint"
// var isPrintFlag = false;
var isPrintFlag = true;

exp.invokeCallback = function(cb) {
  if(typeof cb === 'function') {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }
};

exp.applyCallback = function(cb, args) {
  if(typeof cb === 'function') {
    cb.apply(null, args);
  }
};

// print the file name and the line number ~ begin
function getStack(){
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) {
    return stack;
  };
  var err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

function getFileName(stack) {
  return stack[1].getFileName();
}

function getLineNumber(stack){
  return stack[1].getLineNumber();
}

exp.myPrint = function() {
  if (isPrintFlag) {
    var len = arguments.length;
    if(len <= 0) {
      return;
    }
    var stack = getStack();
    var d = new Date();
    var aimStr = '[' + d.toLocaleTimeString() + '.' + d.getMilliseconds() + '] `' + getFileName(stack) + '` @' + getLineNumber(stack) + ' :\n';
    for(var i = 0; i < len; ++i) {
      aimStr += arguments[i] + ' ';
    }
    console.log('\n' + aimStr);
  }
};
// print the file name and the line number ~ end

