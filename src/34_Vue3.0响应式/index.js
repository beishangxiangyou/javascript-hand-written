function isObject (obj) {
  return typeof obj === 'object' && obj != null
}

function reactive (obj) {
  if (!isObject(obj)) return

  const observed = new Proxy(obj, {
    get (target, key, receiver) {
      const ret = Reflect.get(target, key, receiver)
      console.log('get-->', target, key)
      track(target, key)
      return isObject(ret) ? reactive(ret) : ret
    },
    set (target, key, value, receiver) {
      const ret = Reflect.set(target, key, value, receiver)
      console.log('set->', target, key, value)
      trigger(target, key)
      return ret
    },
    deleteProperty (target, key) {
      const ret = Reflect.deleteProperty(target, key)
      console.log('deleteProperty->', target, key)
      trigger(target, key)
      return ret
    }
  })

  return observed
}

const effectStack = []

function effect (callback) {
  const callbackWrapper = function () {
    try {
      effectStack.push(callbackWrapper)
      return callback()
    } finally {
      effectStack.pop()
    }
  }
  callbackWrapper()
  return callbackWrapper
}

const targetMap = new WeakMap()

function track (target, key) {
  const effectFn = effectStack[effectStack.length - 1]
  if (effectFn) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if (!deps.has(effectFn)) {
      deps.add(effectFn)
    }
  }
}

function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}

const obj = {
  name: '斗图王',
  car: {
    brand: '兰博基尼'
  },
  fav: ['吃饭', '睡觉', '上班']
}

const state = reactive(obj)

function updateDom () {
  document.getElementById('app').innerHTML = `${state.name} --> ${state.car.brand}`
}

effect(updateDom)

setTimeout(() => {
  state.name = '请叫我斗图王'
  state.car.brand = '法拉利'
}, 3000)
