const express = require('express')
const app = express()
const port = 3000

app.get('/cute', (req, res) => {
  res.send('<html><body><h1>Cute</h1></body></html>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})