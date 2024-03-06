//importing function connectToMongo from db.js file (located in same folder:-'./db)
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
connectToMongo();



const app = express()
const port = 3000

app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
