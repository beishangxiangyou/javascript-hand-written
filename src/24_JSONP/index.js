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
