const arr = [1, [2, [3, [4, 5]]], 6]
// => [1, 2, 3, 4, 5, 6]

const res = []
const fn = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i])
    } else {
      res.push(arr[i])
    }
  }
}
fn(arr)

console.log(res)
