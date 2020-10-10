const test = document.getElementById('test')

test.addEventListener('input', debounce(function () {
  console.log(1111)
}))

// test.addEventListener('input', function (event) {
//   console.log(this, event)
// })

function debounce (fn, wait = 300) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(arguments)
      fn.apply(this, arguments)
    }, wait)
  }
}
