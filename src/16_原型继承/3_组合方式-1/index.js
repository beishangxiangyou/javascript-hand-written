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

Child.prototype = new Parent() // new Parent()，多创建了一次 fav

const child1 = new Child()
const child2 = new Child()
console.log(child1.fav === child2.fav)
child1.say()
