window.addEventListener('scroll', function () {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  if (clientHeight + scrollTop >= scrollHeight) {
    // 检测到滚动至页面底部，进行后续操作
    // ...
  }
}, false);


// 参考：https://github.com/SherrybabyOne/Demos/blob/master/Interview/JavaScript/%E6%BB%9A%E5%8A%A8%E5%8A%A0%E8%BD%BD.html
