# javascript-hand-written
前端面试，高频手写题，巩固你的 **javascript** 基础知识

### 总览
* #### 01、数组扁平化
  - ##### 使用flat()
      ```javascript
    const arr1 = [0, 1, 2, [3, 4]]
    console.log(arr1.flat()) // expected output: [0, 1, 2, 3, 4]
    
    
    const arr2 = [0, 1, 2, [[[3, 4]]]]
    console.log(arr2.flat()) // expected output: [0, 1, 2, [[3, 4]]]，默认只展开一层
    console.log(arr2.flat(2)) // expected output: [0, 1, 2, [3, 4]]
    
    
    //使用 Infinity，可展开任意深度的嵌套数组
    const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
    console.log(arr4.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      ```
  - ##### 利用正则
      ```javascript
    const arr = [1, [2, [3, [4, 5]]], 6]
    // => [1, 2, 3, 4, 5, 6]
    
    console.log(JSON.stringify(arr)) // "[1,[2,[3,[4,5]]],6]"
    
    const res =
      JSON.stringify(arr)
        .replace(/\[|\]/g, '')
        .split(',')
        .map(item => Number(item))
    
    console.log(res)
      ```
  - ##### 正则改良版本
      ```javascript
    const arr = [1, [2, [3, [4, 5]]], 6]
    const res = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
    
    console.log(res)
      ```
  - ##### 使用reduce
      ```javascript
    const arr = [1, [2, [3, [4, 5]]], 6]
    // => [1, 2, 3, 4, 5, 6]
    
    const flatten = arr => {
        return arr.reduce((pre, cur) => {
          return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
        }, [])
    }
    const res = flatten(arr)
    
    console.log(res)
      ```
  - ##### 函数递归
      ```javascript
    const arr = [1, [2, [3, [4, 5]]], 6]
    // => [1, 2, 3, 4, 5, 6]
    
    const res = []
    const fn = arr => {
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            fn(arr[i])
          } else {
            res.push(arr[i])
          }
        }
    }
    fn(arr)
    
    console.log(res)
      ```
* #### 02、数组去重
  - ##### 利用Set
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const res = Array.from(new Set(arr))
    
    console.log(res)
      ```
  - ##### 两层for循环 + splice
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const unique = arr => {
      let len = arr.length
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (arr[i] === arr[j]) {
            arr.splice(j, 1)
            // 每删除一个数，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
            len--
            j--
          }
        }
      }
      return arr
    }
    
    console.log(unique(arr))
      ```
  - ##### 利用indexOf
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const unique = arr => {
        const res = []
        for (let i = 0; i < arr.length; i++) {
          if (res.indexOf(arr[i]) === -1) res.push(arr[i])
        }
        return res
    }
    
    console.log(unique(arr))
      ```
  - ##### 利用includes
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const unique = arr => {
        const res = []
        for (let i = 0; i < arr.length; i++) {
          if (!res.includes(arr[i])) res.push(arr[i])
        }
        return res
    }
    
    console.log(unique(arr))
      ```
  - ##### 利用filter
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const unique = arr => {
        return arr.filter((item, index) => {
          return arr.indexOf(item) === index
        })
    }
    
    console.log(unique(arr))
      ```
  - ##### 利用Map
      ```javascript
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
    // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    
    const unique = arr => {
      const map = new Map()
      const res = []
      for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i])) {
          map.set(arr[i], true)
          res.push(arr[i])
        }
      }
      return res
    }
    
    console.log(unique(arr))
      ```
* #### 03、类数组转化为数组
  - ##### Array.from 
      ```javascript
    const divs = Array.from(document.querySelectorAll('div'))
    
    console.log(divs, Array.isArray(divs))
      ```
  - ##### Array.prototype.slice.call()
      ```javascript
    const divs = Array.prototype.slice.call(document.querySelectorAll('div'))
    
    console.log(divs, Array.isArray(divs))
      ```
  - ##### 扩展运算符
      ```javascript
    const divs = [...document.querySelectorAll('div')]
    console.log(divs, Array.isArray(divs))
      ```
  - ##### 利用concat
      ```javascript
    const divs = Array.prototype.concat.apply([], document.querySelectorAll('div'))
    
    console.log(divs, Array.isArray(divs))
      ```
* #### 04、Array.prototype.filter()
    ```javascript
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  
  const arr = [0, -1, 2, -2, 3, 6]
  
  Array.prototype.filter = function (func, thisArg) {
      if (this == null) throw new TypeError('this is null or undefined')
      if (typeof func !== 'function') throw new TypeError(func + ' is not function')
      const res = []
      const obj = Object(this)
      // >>>0 保证len为number，且为正整数，参考：https://zhuanlan.zhihu.com/p/100790268
      let len = obj.length >>> 0
      for (let i = 0; i < len; i++) {
        if (i in obj) {
          if (func.call(thisArg, obj[i], i, obj)) {
            res.push(obj[i])
          }
        }
      }
    
      return res
  }
  
  const res = arr.filter(function (value, key, originArr) {
      // console.log(value, key, originArr)
      return value > 0
  })
  
  console.log(res)
    ```
* #### 05、Array.prototype.map()
    ```javascript
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  
  const arr = [0, -1, 2, -2, 3, 6]
  
  Array.prototype.map = function (func, thisArg) {
      if (this == null) throw new TypeError('this is null or undefined')
      if (typeof func !== 'function') throw new TypeError(func + ' is not function')
      const res = []
      const obj = Object(this)
      // >>>0 保证len为number，且为正整数，参考：https://zhuanlan.zhihu.com/p/100790268
      let len = obj.length >>> 0
      for (let i = 0; i < len; i++) {
        if (i in obj) {
          const value = func.call(thisArg, obj[i], i, obj)
          res.push(value)
        }
      }
    
      return res
  }
  
  const res = arr.map(function (value, key, originArr) {
    // console.log(value, key, originArr)
      return value * 2
  })
  
  console.log(res)

    ```
* #### 06、Array.prototype.forEach()
    ```javascript
  const arr = [0, -1, 2, -2, 3, 6]
  
  Array.prototype.forEach = function (callback, thisArg) {
      if (this == null) {
        throw new TypeError('this is null or not defined')
      }
      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
      }
      const O = Object(this)
      const len = O.length >>> 0
      let k = 0
      while (k < len) {
        if (k in O) {
          callback.call(thisArg, O[k], k, O)
        }
        k++
      }
  }
  
  const res = arr.forEach(function (value, key, originArr) {
      // do anything you want
      console.log(key, value)
  })
  
  console.log(res)

    ```
* #### 07、Array.prototype.reduce()
    ```javascript
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  
  const arr = [0, -1, 2, -2, 3, 6]
  
  Array.prototype.reduce = function (callback, initialValue) {
      if (this == null) {
        throw new TypeError('this is null or not defined')
      }
      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
      }
      const O = Object(this)
      const len = O.length >>> 0
      let accumulator = initialValue
      let k = 0
    
      // 如果第二个参数为undefined || null的情况下
      // 则数组的第一个有效值作为累加器的初始值
      if (initialValue == null) {
        while (k < len && !(k in O)) {
          k++
        }
        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
    
        accumulator = O[k++]
      }
    
      while (k < len) {
        if (k in O) {
          accumulator = callback.call(undefined, accumulator, O[k], k, O)
        }
        k++
      }
    
      return accumulator
  }
  
  const res = arr.reduce(function (accumulator, currentValue, key, originArr) {
      return accumulator + ',' + currentValue
  }, '测试')
  
  console.log(res)

    ```
* #### 08、Function.prototype.apply()
    ```javascript
  const arr = [1, 2, 3]
  
  Function.prototype.apply = function (context = window, args) {
      if (typeof this !== 'function') throw new TypeError('type Error')
      const fn = Symbol('this')
      context[fn] = this
    
      const res = context[fn](...args)
      delete context[fn]
      return res
  }
  
  function fn (a, b, c) {
      return a + b + c
  }
  
  const obj = {
      name: '斗图王'
  }
  
  console.log(fn.apply(obj, arr)) // 6

    ```
* #### 09、Function.prototype.call()
    ```javascript
  const arr = [1, 2, 3]
  
  Function.prototype.call = function (context = window, ...args) {
      if (typeof this !== 'function') throw new TypeError('type Error')
      const fn = Symbol('this')
      context[fn] = this
    
      const res = context[fn](...args)
      delete context[fn]
      return res
  }
  
  function fn (a, b, c) {
      return a + b + c
  }
  
  const obj = {
      name: '斗图王'
  }
  
  console.log(fn.call(obj, ...arr)) // 6

    ```
* #### 10、Function.prototype.bind()
    ```javascript
  const arr = [1, 2, 3]
  
  Function.prototype.bind = function (context, ...args) {
      if (typeof this !== 'function') throw new TypeError('type Error')
    
      const self = this
    
      return function F () {
    
        if (this instanceof F) { // 作为构造函数调用
          return new self(...args, ...arguments)
        }
    
        return self.apply(context, [...args, ...arguments]) // 作为普通函数调用
      }
  }
  
  function fn (a, b, c) {
      return a + b + c
  }
  
  const obj = {
      name: '斗图王'
  }
  
  console.log(fn.bind(obj, 1, 2)(3)) // 6

    ```
* #### 11、debounce（防抖）
    ```javascript
  
    ```
* #### 12、throttle（节流）
    ```javascript
  
    ```
* #### 13、函数柯里化
    ```javascript
  
    ```
* #### 14、模拟new操作
    ```javascript
  
    ```
* #### 15、instanceof
    ```javascript
  
    ```
* #### 16、原型继承
    - #### 借助构造函数实现继承
      ```javascript
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

      ```
    - #### 借助原型链实现继承
      ```javascript
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

      ```
    - #### 组合方式-1
      ```javascript
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

      ```
    - #### 组合方式-2
      ```javascript
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

      ```
    - #### 组合方式-3
      ```javascript
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

      ```                        
* #### 17、Object.is
    ```javascript
  Object.defineProperty(Object, 'assign', {
    value (target, ...args) {
      console.log('执行...')
      if (target == null) throw new TypeError(target + ' is not Object')
      const to = Object(target)
  
      for (let i = 0; i < args.length; i++) {
        const source = args[i]
        if (typeof source === 'object' && source !== null) {
          for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              to[key] = source[key]
            }
          }
        }
      }
      return to
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
  
  const target = {}
  const source = {
    name: '斗图王',
    car: {
      brand: '兰博基尼'
    }
  }
  
  Object.assign(target, source)
  console.log(target.car === source.car)

    ```
* #### 18、Object.assign
    ```javascript
    Object.defineProperty(Object, 'assign', {
      value (target, ...args) {
        console.log('执行...')
        if (target == null) throw new TypeError(target + ' is not Object')
        const to = Object(target)
    
        for (let i = 0; i < args.length; i++) {
          const source = args[i]
          if (typeof source === 'object' && source !== null) {
            for (let key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                to[key] = source[key]
              }
            }
          }
        }
        return to
      },
      enumerable: false,
      writable: true,
      configurable: true
    })
    
    const target = {}
    const source = {
      name: '斗图王',
      car: {
        brand: '兰博基尼'
      }
    }
    
    Object.assign(target, source)
    console.log(target.car === source.car)

    ```
* #### 19、深拷贝
    ```javascript
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

    ```
* #### 20、Promise
    ```javascript
  
    ```
* #### 21、Promise.all
    ```javascript
  
    ```
* #### 22、Promise.race
    ```javascript
  
    ```
* #### 23、Promise并行限制
    ```javascript
  
    ```
* #### 24、JSONP
    ```javascript
    function jsonp ({url, params, callback}) {
    
      function generateUrl () {
        let paramsStr = ''
        for (let key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            paramsStr += `${key}=${params[key]}&`
          }
        }
        return `${url}?${paramsStr}callback=${callback}`
      }
    
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = generateUrl()
        document.head.appendChild(script)
        window[callback] = data => {
          resolve(data)
          document.head.removeChild(script)
        }
      })
    }
    
    jsonp({
      url: 'http://localhost:3000',
      params: {
        nickname: 'dou tu wang'
      },
      callback: 'callback'
    }).then(res => {
      console.log(res)
    })

    ```
* #### 25、AJAX
    ```javascript
    function getJson (url) {
      return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp')
        xhr.open('get', url, false)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return
          if (xhr.status === 200 || xhr.status === 304) {
            resolve(xhr.responseText)
          } else {
            reject(new Error(xhr.responseText))
          }
        }
        xhr.send()
      })
    }
    
    getJson('http://localhost:3000')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })

    ```
* #### 26、event模块
    ```javascript
  
    ```
* #### 27、图片懒加载
    ```javascript
  
    ```
* #### 28、滚动加载
    ```javascript
  
    ```
* #### 29、渲染几万条数据不卡住页面
    ```javascript
  
    ```
* #### 30、打印出当前网页使用了多少种HTML元素
    ```javascript
    const fn = () => {
      return [...new Set([...document.querySelectorAll('*')])].map(el => el.tagName).length
    }  
    console.log(fn())
    ```
* #### 31、将VirtualDom转化为真实DOM结构
    ```javascript
  
    ```
* #### 32、字符串解析问题
    ```javascript
  
    ```
* #### 33、Vue2.0响应式
    ```javascript
  
    ```
* #### 34、Vue3.0响应式
    ```javascript
  
    ```
* #### 35、Object.create
    ```javascript
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

    ```


### 参考：https://juejin.im/post/6875152247714480136
