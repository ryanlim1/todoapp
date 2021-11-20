const authController = {};

authController.verifyUser = (req, res, next) => {
  const {user, pass} = req.body;
  if(user === 'codesmith' && pass === 'ilovetesting'){
    return next();
  }
  return next({message: 'Unsuccessful Login Attempt'});
};

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin', {
    httpOnly: true,
  });
  return next();
};

authController.verifyCookie = (req, res, next) => {
  const {token} = req.cookies;
  if(token === 'admin') return next();
  return next({message: 'You must be signed in to view this page'});
};

module.exports = authController;
