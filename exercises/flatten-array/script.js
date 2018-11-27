var data = [
  [1, 2, 3],
  [2, 4, 5], 6, [2, [3, 10, [15, [15, 21, 23], 22], 36], 7, 1, {1: 'apple' , 2: ' nick' , 3: 'ok' }]
];

function flattenArray(data, acc) {
  var result = data.reduce(function (arr, val) {
    if (Array.isArray(val)) {
      arr = flattenArray(val, arr);
    } else if (arr.indexOf(val) == -1) {
      arr.push(val);
    }
    return arr;
  }, acc);
  return result;
}

var answer = flattenArray(data, []);

console.log(answer);