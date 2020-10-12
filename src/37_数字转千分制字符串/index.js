// 更有效的方式，参考：https://www.cnblogs.com/wangmeijian/p/4163936.html

function thousandth (num) {
  if (typeof num === 'number') num = String(num)
  const isHasDot = num.indexOf('.') >= 0
  if (isHasDot) {
    const arr = num.split('.')
    return converse(arr[0]) + '.' + arr[1]
  }
  return converse(num)
}

function converse (str) {
  const base = 3
  if (str.length <= base) return str
  const arr = []
  let rem = str.length % base
  let count = (str.length - rem) / base
  let res = str.slice(0, rem)
  arr.push(res)
  while (count) {
    arr.push(str.slice(rem, rem + base))
    count--
    rem = rem + base
  }
  return arr.join(',')
}

console.log(thousandth(78931429.387)) // 78,931,429.387
console.log(thousandth(78931429)) // 78,931,429
console.log(thousandth(429)) // 429
console.log(thousandth(29)) // 29
console.log(thousandth(0.29)) // 0.29
