require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = require('./db')
const cors = require('cors');


//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
//const db = mongoose.connection
//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('Connected to Database Successfully'))

app.use(express.json()); 
app.use(cors());


const routes = require('./routes/index.js')
//6.40 of the video he makes the routers for the identification
app.use('/api', routes)


app.listen(4000, () => console.log('The Server has Started, on host 4000!'))