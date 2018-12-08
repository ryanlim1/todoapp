const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const myURI = 'mongodb://dbadmin:taco1492@ds143141.mlab.com:43141/cs-assessment';

const app = express();
const port = 3333;
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Moved to TaskModel.js
// mongoose.set('useCreateIndex', true);
// mongoose.connect(myURI, { useNewUrlParser: true },
//   (err) => {
//     if (err) console.log(err);
//     else {
//       console.log('Connected to MongoDB database...');
//     }
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../views')));
app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/postTask', taskController.postTask, (req, res) => {
  return res.status(200).json({'task:': res.locals.item});
});

app.get('/getTasks', taskController.getTasks, (req, res) => {
  return res.status(200).json({'tasks:': res.locals.list});
});

app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  return res.status(200).json({'task deleted:': res.locals.item});
});

app.post('/signin', authController.login, (req, res) => {
  if (res.locals.login) {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'));
  } else {
    res.write('unsuccessful login attempt');
    res.send(401);
  }
});

// app.get('/style.css', (req, res) => {
//   res.setHeader({"Content-Type:": "style/css"});
//   res.sendFile(path.resolve(__dirname, '../assets/css/style.css'));
// });

// app.get('/index.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../assets/js/index.js'));
// });

app.listen(3333, () => console.log(`Server listening on port ${port}...`));
