const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb://dbadmin:taco1492@ds143141.mlab.com:43141/cs-assessment';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.set('useCreateIndex', true);
mongoose.connect(myURI, { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else {
      console.log('Connected to MongoDB database...');
    }
  });

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Task', itemSchema); // <-- export your model
