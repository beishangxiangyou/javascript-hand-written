// 给定10进制数，转换成[2~16]进制区间数，简单模拟一下

function converse (num, base = 2) {

  let rem, res = '', digits = '0123456789ABCDEF', stack = []
  while (num) {
    rem = num % base
    stack.push(rem)

    num = Math.floor(num / base)
  }

  while (stack.length) {
    res += digits[stack.pop()].toString()
  }

  return res
}

function converse2 (num, base = 2) {
  return num.toString(base)
}

console.log(converse(18, 2))
console.log(converse(18, 16))
console.log(converse2(18, 2))
console.log(converse2(18, 16))
