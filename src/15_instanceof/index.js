function myInstanceOf (left, right) {
  if (typeof left !== 'object' || left == null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto == null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

const obj = {
  name: '斗图王',
  age: 123
}

console.log(myInstanceOf(obj, Object))
console.log(myInstanceOf(obj, Function))
