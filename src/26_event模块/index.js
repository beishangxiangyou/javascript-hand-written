function EventEmiter () {
  this.events = Object.create(null)
}

EventEmiter.prototype.$on = function (event, cb) {
  if (this.events[event]) {
    this.events[event].push(cb)
  } else {
    this.events[event] = [cb]
  }
}

EventEmiter.prototype.$once = function (event, cb) {
  function onceName () {
    cb.apply(this, arguments)
    this.$off(event, cb)
  }

  onceName.cbName = cb
  this.$on(event, onceName)
}

EventEmiter.prototype.$off = function (event, cb) {
  if (cb) {
    const cbs = this.events[event]
    for (let i = 0; i < cbs.length; i++) {
      if (cbs[i] === cb || cbs[i].cbName === cb) {
        cbs.splice(i, 1)
        break
      }
    }
  } else {
    this.events[event] = null
  }
}

EventEmiter.prototype.$emit = function (event) {
  const args = [...arguments].slice(1)
  const cbs = this.events[event] || []
  cbs.forEach(cb => {
    cb.apply(this, args)
  })
}

const ev = new EventEmiter()
ev.$on('click', function (data) {
  console.log('click...', data)
})

ev.$once('tap', function (data) {
  console.log('tap...', data)
})

ev.$emit('click', 111)
ev.$off('click')
ev.$emit('click', 222)
ev.$emit('tap', 333)
ev.$emit('tap', 444)

