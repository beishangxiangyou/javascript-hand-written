function Parent () {
  this.name = 'Parent'
  this.fav = ['吃饭', '睡觉']
}

Parent.prototype.say = function () {
  console.log('say...')
}

function Child () {
  this.nickname = '斗图王'
}

Child.prototype = new Parent()

const child1 = new Child()
const child2 = new Child()
console.log(child1.fav === child2.fav) // 共享Parent中的fav
child1.say()
