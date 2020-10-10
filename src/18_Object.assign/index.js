Object.defineProperty(Object, 'assign', {
  value (target, ...args) {
    console.log('执行...')
    if (target == null) throw new TypeError(target + ' is not Object')
    const to = Object(target)

    for (let i = 0; i < args.length; i++) {
      const source = args[i]
      if (typeof source === 'object' && source !== null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key]
          }
        }
      }
    }
    return to
  },
  enumerable: false,
  writable: true,
  configurable: true
})

const target = {}
const source = {
  name: '斗图王',
  car: {
    brand: '兰博基尼'
  }
}

Object.assign(target, source)
console.log(target.car === source.car)
