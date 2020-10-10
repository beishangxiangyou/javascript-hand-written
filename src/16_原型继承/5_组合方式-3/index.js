function Parent () {
  this.name = 'Parent'
  this.fav = ['吃饭', '睡觉']
}

Parent.prototype.say = function () {
  console.log('say...')
}

function Child () {
  Parent.call(this)
  this.nickname = '斗图王'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const child = new Child()
child.say()

console.log(child.constructor) // Child
