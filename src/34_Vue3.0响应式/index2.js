const toProxy = new WeakMap()
const toRaw = new WeakMap()

function isObject (target) {
  return typeof target === 'object' && target != null
}

function hasOwn (target, key) {
  return target.hasOwnProperty(key)
}

function reactive (target) {
  return createReactive(target)
}

function createReactive (target) {
  if (!isObject(target)) return target

  let proxy = toProxy.get(target)
  if (proxy) return proxy
  if (toRaw.has(target)) return target

  const baseHandler = {
    get (target, key, receiver) {
      const ret = Reflect.get(target, key, receiver)
      track(target, key)
      return isObject(ret) ? reactive(ret) : ret
    },
    set (target, key, value, receiver) {
      // console.log(key, value)
      let hadKey = hasOwn(target, key)
      let oldValue = target[key]
      const ret = Reflect.set(target, key, value, receiver)
      if (!hadKey) { // 新增
        console.log('新增')
        trigger(target, key)
      } else if (oldValue !== value) { // 修改
        console.log('修改')
        trigger(target, key)
      }

      return ret
    },
    deleteProperty (target, key) {
      const ret = Reflect.deleteProperty(target, key)
      trigger(target, key)
      return ret
    }
  }

  const observed = new Proxy(target, baseHandler)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}

const activeEffectStack = []

function effect (fn) {
  let effectFn = createReactiveEffect(fn)
  effectFn()
}

function createReactiveEffect (fn) {
  let effect = function () {
    return run(effect, fn)
  }
  return effect
}

function run (effect, fn) {
  activeEffectStack.push(effect)
  fn()
  activeEffectStack.pop()
}

const targetsMap = new WeakMap()

function track (target, key) {
  let effect = activeEffectStack[activeEffectStack.length - 1]
  if (effect) {
    let depsMap = targetsMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetsMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if (!deps.has(key)) {
      deps.add(effect)
    }
  }
}

function trigger (target, key) {
  let depsMap = targetsMap.get(target)
  if (depsMap) {
    let deps = depsMap.get(key)
    deps.forEach(effect => effect())
  }
}

const obj = {
  name: '斗图王',
  car: {
    brand: '兰博基尼'
  },
  fav: ['吃饭', '睡觉', '上班']
}

// const fav = ['吃饭', '睡觉', '上班']
// const state2 = reactive(fav)

// state2.push('赚钱')


const state = reactive(obj)

function updateDom () {
  document.getElementById('app').innerHTML = `${state.name} --> ${state.car.brand}`
}

effect(updateDom)

setTimeout(() => {
  state.name = '请叫我斗图王'
  state.car.brand = '法拉利'
}, 3000)
