var data = [[1, 2, 3], [2, 4, 5], 6, [2,3,4,7,1]];

var answer = data.reduce(function (arr, val) {
  if(Array.isArray(val)){
    val.forEach(function(item) {
      if(arr.indexOf(item) == -1){
        arr.push(item)
      };
    });
  } else if(arr.indexOf(val) == -1 ){
    arr.push(val);
  }
  return arr;
},[]);

console.log(answer);