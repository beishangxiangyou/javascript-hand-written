function newOperator (actor, ...args) {
  if (typeof actor !== 'function') throw  new TypeError(actor + 'is not function')
  const obj = Object.create(actor.prototype)
  const res = actor.apply(obj, args)
  const isObject = obj => typeof obj === 'object' && obj !== null
  const isFunction = fn => typeof fn === 'function'
  return isObject(res) || isFunction(res) ? res : obj
}

function M (name, age) {
  this.name = name
  this.age = age
}


const res = newOperator(M, '斗图王', 18)
console.log(res)
