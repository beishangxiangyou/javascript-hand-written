const arr1 = [0, 1, 2, [3, 4]]
console.log(arr1.flat()) // expected output: [0, 1, 2, 3, 4]


const arr2 = [0, 1, 2, [[[3, 4]]]]
console.log(arr2.flat()) // expected output: [0, 1, 2, [[3, 4]]]，默认只展开一层
console.log(arr2.flat(2)) // expected output: [0, 1, 2, [3, 4]]


//使用 Infinity，可展开任意深度的嵌套数组
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
console.log(arr4.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



