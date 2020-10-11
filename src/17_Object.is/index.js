+0 === -0  // true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

const is = (x, y) => {
  if (x === y) {
    // +0和-0应该不相等
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

