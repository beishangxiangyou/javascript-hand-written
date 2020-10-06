const arr = [1, [2, [3, [4, 5]]], 6]
// => [1, 2, 3, 4, 5, 6]

console.log(JSON.stringify(arr)) // "[1,[2,[3,[4,5]]],6]"

const res =
  JSON.stringify(arr)
    .replace(/\[|\]/g, '')
    .split(',')
    .map(item => Number(item))

console.log(res)
