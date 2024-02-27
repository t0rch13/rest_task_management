const Task = require('../models/Task.js');
const User = require('../models/User.js');

// Get Admin
exports.getAdmin = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        res.render('admin', { user: req.session.user, lang });
    } catch (error) {
        console.error('Error in getAdmin controller:', error);
    }
};

// Get Users
exports.getUsers = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        const users = await User.find();
        res.render('users', { user: req.session.user, users, lang });
    } catch (error) {
        console.error('Error in getUsers controller:', error);
    }
};

// Get User
exports.getUser = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        const user = await User.findById(req.params.id);
        res.render('user', { user: req.session.user, user, lang });
    } catch (error) {
        console.error('Error in getUser controller:', error);
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error in deleteUser controller:', error);
    }
}

// Get Edit User
exports.getEditUser = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        const user = await User.findById(req.params.id);
        res.render('editUser', { user: req.session.user, user, lang });
    } catch (error) {
        console.error('Error in getEditUser controller:', error);
    }
}

// Post Edit User
exports.postEditUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const lang = req.cookies.lang || "en";

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('editUser', { user: req.session.user, errors: errors.array(), lang });
    }

    try {
        const user = await User.findById(req.params.id);
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error in postEditUser controller:', error);
    }
}
