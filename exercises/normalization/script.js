var data = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    }, {
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }]
  }, {
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];

console.log('======Before Normalization======');
console.log(data);


function findChild(obj) {
  childArray = [];
  obj.children.forEach(function (value) {
    childArray.push(value.id);
  });
  return childArray;
}

var finalResult = {};

function normalize(arr, acc) {
  var answer = arr.reduce(function (array, val) {
    obj = {};
    obj.id = val.id;
    obj.name = val.name;
    if (val.hasOwnProperty('children')) {
      obj.children = findChild(val);
    } else {
      obj.children = [];
    }

    if (val.hasOwnProperty('children')) {
      array.push(obj);
      normalize(val.children, array);
    } else {
      array.push(obj);
    }
    return array;
  }, acc);
  return answer;
}

function arrayToObj(arr){
  var obj = {};
  arr.forEach(function(val){
    obj[val.id] = val;
  });
  return obj;
}

finalResult = arrayToObj( normalize(data,[]) );
console.log('======After Normalization======');
console.log(finalResult);

// function normalize(arr) {
//   var answer = arr.forEach(function (val) {
//     var obj = {};
    
//     obj.id = val.id;
//     obj.name = val.name;
//     if (val.hasOwnProperty('children')) {
//       obj.children = findChild(val);
//     } else {
//       obj.children = [];
//     }

//     if (val.hasOwnProperty('children')) {
//       finalResult[val.id] = obj;
//       normalize(val.children);
//     } else {
//       finalResult[val.id] = obj;
//     }
//   });
// }

// normalize(data);
// console.log(finalResult);
