(function (window) {
  const PENDING = 'pending'
  const FULFILLED = 'fulfilled'
  const REJECTED = 'rejected'

  function isFunction(func) {
    return typeof func === 'function'
  }

  function Promise(executor) {
    this.status = PENDING
    this.data = undefined
    this.callbacks = []

    const resolve = value => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.data = value

      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(({
            onResolved
          }) => {
            onResolved.call(this)
          })
        })
      }

    }

    const reject = reason => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.data = reason

      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(({
            onRejected
          }) => {
            onRejected.call(this)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  /*
    1. 如果onResolved在执行时抛出异常，则返回的promise就会失败，reason就是error
    2. 如果onResolved在执行时，没有返回值或者返回值不是promise类型，返回的promise就会成功，value就是返回的值
    3. 如果onResolved的返回值是promise类型，则返回的promise完全依赖这个promise
  */
  Promise.prototype._handler = function (callback, resolve, reject) {
    try {
      const returnValue = callback(this.data)
      if (returnValue instanceof Promise) {
        returnValue.then(resolve, reject)
      } else {
        resolve(returnValue)
      }
    } catch (e) {
      reject(e)
    }
  }

  Promise.prototype.then = function (onResolved, onRejected) {

    if (!isFunction(onResolved)) onResolved = value => value
    if (!isFunction(onRejected)) onRejected = reason => {
      throw reason
    }

    return new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          this._handler(onResolved, resolve, reject)
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          this._handler(onRejected, resolve, reject)
        })
      } else if (this.status === PENDING) {
        this.callbacks.push({
          onResolved() {
            this._handler(onResolved, resolve, reject)
          },
          onRejected() {
            this._handler(onRejected, resolve, reject)
          }
        })
      }
    })

  }

  Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  Promise.prototype.finally = function (callback) { // 模拟 finally
    return this.then(value => {
      callback.call(this, value)
      return value
    }, reason => {
      callback.call(this, reason)
      throw reason
    })
  }

  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      const length = promises.length
      const res = Array.from({
        length
      })
      let count = 0
      for (let i = 0; i < length; i++) {
        Promise.resolve(promises[i]).then(value => {
          res[i] = value
          count++
          if (count == length) {
            resolve(res)
          }
        }, reason => {
          reject(reason)
        })
      }
    })
  }

  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      const length = promises.length
      for (let i = 0; i < length; i++) {
        Promise.resolve(promises[i]).then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      }
    })
  }

  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })

  }

  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  Promise.resolveDelay = function (value, time) { // 自定义
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time)
    })
  }

  Promise.rejectDelay = function (reason, time) { // 自定义
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }

  window.Promise = Promise

})(window)
