const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
const PORT = 3333;

const apiRouter = require('./routes/api.js');
const authController = require('./controllers/authController')

app.use(express.json()); // middleware that parses through the incoming requests w/ JSON payloads
app.use(express.static(path.resolve(__dirname, '../assets'))); // serves static files
app.use(express.urlencoded({extended: true})); // parses through the incoming requests w/ urlencoded payloads
app.use(cookieParser()); // 

app.use('/api', apiRouter);

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  return res.redirect('/secret');
});

app.get('/secret', authController.verifyCookie, (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// local error handler
app.use((req, res) => {
  return res.sendStatus(404).send('This is not the page you\'re looking for...');
});

// global error handler
app.use((err, req, res, next) =>{
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred'}
  };
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
