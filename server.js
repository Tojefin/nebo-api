const express = require('express')
const axios = require('axios');

const app = express()
const PORT = 4000
const key = process.env.key

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})


// Export the Express API
module.exports = app
