const { User } = require("../models/User");

var authenticate = (req, res, next) => {
  if (req.session.user) {
      next();
  } else {
      res.redirect('/login');
  } 
};

module.exports = {authenticate};