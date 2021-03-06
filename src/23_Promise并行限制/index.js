class Scheduler {
  constructor (maxCount) {
    this.queue = []
    this.maxCount = maxCount
    this.runCount = 0
  }

  add (promiseCreator) {
    this.queue.push(promiseCreator)
  }

  start () {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }

  request () {

    if (this.queue == null || this.queue.length === 0 || this.runCount >= this.maxCount) return

    this.runCount++

    this.queue.shift()().then(() => {
      this.runCount--
      this.request()
    })
  }
}

const timeout = time => new Promise(((resolve) => {
  setTimeout(resolve, time)
}))

const MAX_COUNT = 2
const scheduler = new Scheduler(MAX_COUNT)

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

scheduler.start()
