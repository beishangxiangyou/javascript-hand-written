function add () {
  const args = [...arguments]

  function fn () {
    args.push(...arguments)
    return fn
  }

  fn.toString = function () {
    return args.reduce(function (value, current) {
      return value + current
    })
  }

  return fn
}

// function add () {
//   function fn () {
//     return fn
//   }
//
//   fn.toString = function () {
//     return 111
//   }
//   return fn
// }

const res = add(1)(2)(3)
console.log(res, typeof res) // typeof res === 'function'
