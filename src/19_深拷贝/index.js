function deepClone (target, hash = new WeakMap()) {

  if (typeof target !== 'object' || target === null) return target

  if (hash.get(target)) return hash.get(target) // 有缓存

  const cloneTarget = Array.isArray(target) ? [] : {}
  hash.set(target, cloneTarget)

  // 处理symbol key
  const symbolKeys = Object.getOwnPropertySymbols(target)
  if (symbolKeys.length) {
    symbolKeys.forEach(symKey => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = deepClone(target[symKey])
      } else {
        cloneTarget[symKey] = target[symKey]
      }
    })
  }

  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] =
        typeof target[key] === 'object' && target[key] !== null
          ? deepClone(target[key])
          : target[key]
    }
  }

  return cloneTarget

}

const s1 = Symbol('s1')
const source = {
  name: '斗图王',
  [s1]: {
    car: {
      name: '兰博基尼'
    }
  }
}

const target = deepClone(source)
console.log(target)
