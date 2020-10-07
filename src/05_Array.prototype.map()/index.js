// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map

const arr = [0, -1, 2, -2, 3, 6]

Array.prototype.map = function (func, thisArg) {
  if (this == null) throw new TypeError('this is null or undefined')
  if (typeof func !== 'function') throw new TypeError(func + ' is not function')
  const res = []
  const obj = Object(this)
  // >>>0 保证len为number，且为正整数，参考：https://zhuanlan.zhihu.com/p/100790268
  let len = obj.length >>> 0
  for (let i = 0; i < len; i++) {
    if (i in obj) {
      const value = func.call(thisArg, obj[i], i, obj)
      res.push(value)
    }
  }

  return res
}

const res = arr.map(function (value, key, originArr) {
  // console.log(value, key, originArr)
  return value * 2
})

console.log(res)
