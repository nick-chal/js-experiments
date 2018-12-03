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
  var childArray = obj.children.reduce(function (acc, value) {
    acc.push(value.id);
    return acc;
  }, []);
  return childArray;
}


function normalize(arr, acc) {
  var answer = arr.reduce(function (final, val) {
    obj = {};
    obj.id = val.id;
    obj.name = val.name;
    obj.children = []
    final[obj.id] = obj;
    if (val.hasOwnProperty('children')) {
      final[obj.id].children = findChild(val);
      normalize(val.children, final);
    }
    return final;
  }, acc);
  return answer;
}

finalResult = normalize(data, {});

console.log('======After Normalization======');
console.log(finalResult);