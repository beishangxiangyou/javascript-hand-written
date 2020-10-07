const arr = [0, -1, 2, -2, 3, 6]

Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0
  let k = 0
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O)
    }
    k++
  }
}

const res = arr.forEach(function (value, key, originArr) {
  // do anything you want
  console.log(key, value)
})

console.log(res)
