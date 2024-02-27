const { validationResult } = require('express-validator');
const User = require("../models/User.js");
const validateRegistration = require('../middleware/validateRegistration');
const bcrypt = require('bcryptjs');

  
// Get Login 
exports.getLogin =  async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        if(lang === "en") { 
            res.render('en/login', {user: req.session.user});
        } else {
            res.render('ru/login', {user: req.session.user});
        }
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
            if(lang === "en") { 
                return res.render('en/login', { user: req.session.user, error: 'Invalid username or password' });
            } else {    
                return res.render('ru/login', { user: req.session.user, error: 'Invalid username or password' });
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            if(lang === "en") { 
                return res.render('en/login', { user: req.session.user, error: 'Invalid username or password' });
            } else {    
                return res.render('ru/login', { user: req.session.user, error: 'Invalid username or password' });
            }
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
        if(lang === "en") { 
            res.render('en/register', {user: req.session.user});
        } else {
            res.render('ru/register', {user: req.session.user});
        }
    } catch (error) {
        console.error('Error in getRegister controller:', error);
    }
};

exports.postRegister = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const lang = req.cookies.lang || "en";

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        if(lang === "en") { 
            return res.render('en/register', { user: req.session.user, errors: errors.array() });
        } else {    
            return res.render('ru/register', { user: req.session.user, errors: errors.array() });
        }
    }

    try {
        // Check if the username is already taken
        let user = await User.findOne({ username });
        if (user) {
            if (lang === "en") {
                return res.render('en/register', { user: req.session.user, error: 'Username is already taken', lang });
            } else { 
                return res.render('ru/register', { user: req.session.user, error: 'Имя пользователя уже занято', lang });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ username, email, password: hashedPassword });
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
