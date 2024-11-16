const coonectToMongo=require('./db')
var cors = require('cors')
coonectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())

// Available Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})