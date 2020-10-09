const arr = [1, 2, 3]

Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') throw new TypeError('type Error')

  const self = this

  return function F () {

    if (this instanceof F) { // 作为构造函数调用
      return new self(...args, ...arguments)
    }

    return self.apply(context, [...args, ...arguments]) // 作为普通函数调用
  }
}

function fn (a, b, c) {
  return a + b + c
}

const obj = {
  name: '斗图王'
}

console.log(fn.bind(obj, 1, 2)(3)) // 6
