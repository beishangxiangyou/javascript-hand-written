const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

const unique = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

console.log(unique(arr))

