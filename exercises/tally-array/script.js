var arr = ['john', 'mary', 'john', 'sam', 'sam', 'sam', 'john'];

var answer = arr.reduce(function(obj, val, index){
  if(!obj[val]){
    obj[val] = 1;
  } else {
    obj[val]++;
  }
  return obj;
},{});

console.log(answer);