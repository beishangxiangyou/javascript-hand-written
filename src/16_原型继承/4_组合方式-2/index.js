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

Child.prototype = Parent.prototype

const child = new Child()
child.say()

console.log(child.constructor) //是 Parent，期望是 Child
