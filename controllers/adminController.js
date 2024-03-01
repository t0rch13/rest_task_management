const Task = require('../models/Task.js');
const User = require('../models/User.js');

// Get Admin
exports.getAdmin = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        const users = await User.find();
        if (lang === "en") {
            res.render('en/admin', { user: req.session.user, trimDeadline, users});
        } else {
            res.render('ru/admin', { user: req.session.user, trimDeadline, users});
        }
    } catch (error) {
        console.error('Error in getAdmin controller:', error);
    }
};

// Get Edit User    
exports.getEditUser = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        const userToEdit = await User.findById(req.params.id);
        if (lang === "en") {
            res.render('en/editUser', { user: req.session.user, userToEdit});
        } else {
            res.render('ru/editUser', { user: req.session.user, userToEdit});
        }
    } catch (error) {
        console.error('Error in getEditUser controller:', error);
    }
};

// Put Edit User 
exports.putEditUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);  
        res.redirect('/admin');
    } catch (error) { 
        console.error('Error in postEditUser controller:', error);
    } 
};


// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error in deleteUser controller:', error);
    }
}


function trimDeadline(deadlineString) {
    const deadline = new Date(deadlineString);
    return deadline.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg', timeZoneName: 'short' });
}
