// Dummy users data (replace this with actual user data and database)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];
  
  // Index controller
exports.index = (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user.username}! <a href="/logout">Logout</a>`);
    } else {
        res.redirect('/login');
    }
};
  
  // Get Login page
exports.getLogin = (req, res) => {
    res.render('login');
};
  
  // Post Login page
exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
};
  
  // Logout controller
exports.logout = (req, res) => {
req.session.destroy((err) => {
    if (err) {
    console.error('Error destroying session:', err);
    } else {
    res.redirect('/login');
    }
});
};
