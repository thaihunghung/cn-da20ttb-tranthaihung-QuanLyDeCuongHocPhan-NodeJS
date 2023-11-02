const express = require('express')
const app = express()
const dotenv = require('dotenv')
//khoi tao dotenv
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})