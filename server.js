const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))
app.listen(3000, () => console.log('the app listens on port 3000'))