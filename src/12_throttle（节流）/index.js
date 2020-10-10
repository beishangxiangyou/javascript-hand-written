window.onresize = throttle(function (event) {
  console.log(111, event)
})

function throttle (fn, wait = 300) {
  let flag = false, timer
  return function () {
    if (flag) return
    flag = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(this)
      fn.apply(this, arguments)
      flag = false
    }, wait)

  }
}
