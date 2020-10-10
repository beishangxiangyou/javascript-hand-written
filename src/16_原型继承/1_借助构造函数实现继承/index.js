function Parent () {
  this.name = 'Parent'
}

Parent.prototype.say = function () {
  console.log('say...')
}

function Child () {
  Parent.call(this)
  this.nickname = '斗图王'
}

const child = new Child()
console.log(child)
console.log(child.say()) // 报错，拿不到 Parent上的 say 方法
