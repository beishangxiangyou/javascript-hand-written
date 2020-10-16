const methods = ['push', 'pop', 'shift', 'unshift']
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

methods.forEach(key => {
  arrayMethods[key] = function () {
    const originMethod = arrayProto[key]
    const result = originMethod.call(this, ...arguments)
    // observe(inserted)
    // dep.notify()
    updateView()
    return result
  }
})

function defineReactive (data, key, value) {
  observe(value)
  // const dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      // dep.depend()
      return value
    },
    set (newVal) {
      if (value != newVal) {
        console.log(value, newVal)
        value = newVal
        observe(newVal)
        // dep.notify()
        updateView()
      }
    },
    enumerable: true,
    configurable: true
  })
}

function observe (data) {
  if (typeof data !== 'object' || data == null) return data

  if (Array.isArray(data)) {
    Object.setPrototypeOf(data, arrayMethods)
  }

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}


function updateView () {
  console.log('更新视图...')
}

const obj = {
  name: '斗图王',
  car: {
    brand: '兰博基尼'
  },
  fav: ['吃饭', '睡觉', '上班']
}

observe(obj)
// obj.name = '请叫我斗图王'
// obj.car.brand = '法拉利'
obj.fav.push('赚钱')
