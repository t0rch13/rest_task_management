const Task = require('../models/Task.js');
const User = require('../models/User.js');

// Get Admin
exports.getAdmin = async (req, res) => {
    const lang = req.cookies.lang || "en";
    const users = await User.find();
    try {
        res.render('en/admin', { user: req.session.user, trimDeadline, users});
    } catch (error) {
        console.error('Error in getAdmin controller:', error);
    }
};

// Post Edit Username
exports.postEditUsername = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            // Handle the situation when the user is not found
            console.error('No user found with the given ID');
            return res.status(404).send('No user found');
        }
        user.username = req.body.username;
        await user.save();
        res.redirect('/admin');
    } catch (err) {
        console.error('Error in postEditUsername controller:', err);
        next(err);
    }
};

// Post Edit Email
exports.postEditEmail = async (req, res) => {
    try {
        const user = await User.findById(req.body.id); 
        user.email = req.body.newEmail;
        await user.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Error in postEditEmail controller:', error);
    } 
}


// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error in deleteUser controller:', error);
    }
}



function trimDeadline(deadlineString) {
    const deadline = new Date(deadlineString);
    return deadline.toLocaleString('en-US', { timeZone: 'Asia/Almaty', timeZoneName: 'short' });
}
