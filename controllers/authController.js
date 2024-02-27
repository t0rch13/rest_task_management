const { validationResult } = require('express-validator');
const User = require("../models/User.js");
const validateRegistration = require('../middleware/validateRegistration');

  
// Get Login 
exports.getLogin =  async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        res.render('login', {user: req.session.user, lang});
    } catch (error) {
        console.error('Error in getLogin controller:', error);
    }
};
  
// Post Login 
exports.postLogin = async(req, res) => {
    const { username, password } = req.body;

    const lang = req.cookies.lang || "en";
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { user: req.session.user , error: 'Invalid username or password', lang });
        }
        const isMatch = await password===user.password;

        if (!isMatch) {
            return res.render('login', { user: req.session.user, error: 'Invalid username or password', lang });
        } 

        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error in postLogin controller:', error);
    }
};

exports.getRegister = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        res.render('register', {user: req.session.user, lang});
    } catch (error) {
        console.error('Error in getRegister controller:', error);
    }
};

exports.postRegister = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const lang = req.cookies.lang || "en";

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', { user: req.session.user, errors: errors.array(), lang });
    }

    try {
        // Check if the username is already taken
        let user = await User.findOne({ username });
        if (user) {
            return res.render('register', { user: req.session.user, error: 'Username is already taken', lang });
        }

        // Create a new user
        user = new User({ username, email, password });
        await user.save();

        res.redirect('/login'); 
    } catch (error) {
        console.error('Error in postRegister controller:', error);
        res.render('register', { user: req.session.user, error: 'An error occurred during registration', lang });
    }
}


  
// Logout controller
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/login');
        }
    });
};
