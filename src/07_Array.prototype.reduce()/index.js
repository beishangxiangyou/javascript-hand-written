// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

const arr = [0, -1, 2, -2, 3, 6]

Array.prototype.reduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0
  let accumulator = initialValue
  let k = 0

  // 如果第二个参数为undefined || null的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (initialValue == null) {
    while (k < len && !(k in O)) {
      k++
    }
    // 3. If len is 0 and initialValue is not present,
    //    throw a TypeError exception.
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = O[k++]
  }

  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O)
    }
    k++
  }

  return accumulator
}

const res = arr.reduce(function (accumulator, currentValue, key, originArr) {
  return accumulator + ',' + currentValue
}, '测试')

console.log(res)
