const arr = [1, [2, [3, [4, 5]]], 6]
// => [1, 2, 3, 4, 5, 6]

const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
const res = flatten(arr)

console.log(res)
