require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database Successfully'))

app.use(express.json())

const routes = require('./routes/index.js')
//6.40 of the video he makes the routers for the identification
app.use('/index.js', routes)


app.listen(3000, () => console.log('The Server has Started!!'))