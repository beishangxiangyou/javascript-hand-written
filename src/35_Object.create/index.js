Object.assign(Object, 'create', {
  value (proto, propertyObject) {
    if (propertyObject == null) throw new TypeError('type error')

    function F () {

    }

    F.prototype = proto

    const obj = new F()
    if (propertyObject !== undefined) {
      Object.defineProperties(obj, propertyObject)
    }

    if (proto == null) Object.setPrototypeOf(obj, null)

    return obj
  },
  enumerable: false,
  configurable: true,
  writable: true
})

const proto = {
  name: '斗图王'
}
const target = Object.create(proto)
console.log(target)
