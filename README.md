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
  - ##### 利用include
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
  
    ```
* #### 05、Array.prototype.map()
    ```javascript
  
    ```
* #### 06、Array.prototype.forEach()
    ```javascript
  
    ```
* #### 07、Array.prototype.reduce()
    ```javascript
  
    ```
* #### 08、Function.prototype.apply()
    ```javascript
  
    ```
* #### 09、Function.prototype.call()
    ```javascript
  
    ```
* #### 10、Function.prototype.bind()
    ```javascript
  
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
    ```javascript
  
    ```
* #### 17、Object.is
    ```javascript
  
    ```
* #### 18、Object.assign
    ```javascript
  
    ```
* #### 19、深拷贝
    ```javascript
  
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
  
    ```
* #### 25、AJAX
    ```javascript
  
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
* #### 35、TODO...
    ```javascript
  
    ```


### 参考：https://juejin.im/post/6875152247714480136
