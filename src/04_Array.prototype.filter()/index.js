// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

const arr = [0, -1, 2, -2, 3, 6]

Array.prototype.filter = function (func, thisArg) {
  if (this == null) throw new TypeError('this is null or undefined')
  if (typeof func !== 'function') throw new TypeError(func + ' is not function')
  const res = []
  const obj = Object(this)
  // >>>0 保证len为number，且为正整数，参考：https://zhuanlan.zhihu.com/p/100790268
  let len = obj.length >>> 0
  for (let i = 0; i < len; i++) {
    if (i in obj) {
      if (func.call(thisArg, obj[i], i, obj)) {
        res.push(obj[i])
      }
    }
  }

  return res
}

const res = arr.filter(function (value, key, originArr) {
  // console.log(value, key, originArr)
  return value > 0
})

console.log(res)
