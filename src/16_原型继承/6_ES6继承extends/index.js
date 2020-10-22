class Parent {
  constructor () {

  }
}

class Child extends Parent {
  constructor () {
    super()
  }
}

console.log(Child.__proto__, Child.prototype)
console.log(Object.getPrototypeOf(Child), Parent)
console.log(Object.getPrototypeOf(Child) === Parent)

// 在线编译ES6：https://es6console.com/
// MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf
