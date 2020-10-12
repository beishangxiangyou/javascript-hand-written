const http = require('http')

const httpServer = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("content-type", "application/json")
  res.end(`callback(${
    JSON.stringify({
      data: {
        msg: 'hello world!'
      },
      status: 'success'
    })
    })`)
})

const port = 3000
httpServer.listen(port, () => {
  console.log(`listening at ${port}`)
})
