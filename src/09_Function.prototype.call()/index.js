const arr = [1, 2, 3]

Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') throw new TypeError('type Error')
  const fn = Symbol('this')
  context[fn] = this

  const res = context[fn](...args)
  delete context[fn]
  return res
}

function fn (a, b, c) {
  return a + b + c
}

const obj = {
  name: '斗图王'
}

console.log(fn.call(obj, ...arr)) // 6
