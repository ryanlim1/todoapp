const uname = 'codesmith';
const pword = 'ilovetesting';

function login(req, res, next) {
  const { username, password} = req.body;
  console.log('called', username, password);
  if (uname === username && pword === password) {
    res.locals.login = true;
    console.log('worked');
    res.cookie('token', 'admin');
    next();
  } else {
    next();
  }
}

module.exports = { login };
