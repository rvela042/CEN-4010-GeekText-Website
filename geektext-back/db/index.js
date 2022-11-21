const mongoose = require('mongoose');

const CONN_STRING = `mongodb+srv://Group12:GeekText12@geektext.pioqvi1.mongodb.net/?retryWrites=true&w=majority` 
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const db = () => Promise.resolve(mongoose.connect(CONN_STRING, options))

db()
  .then(() => console.log('MongoDB is now connected'))
  .catch(e => console.log('Mongo error', e.message));