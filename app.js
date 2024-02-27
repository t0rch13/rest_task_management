const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const taskRoutes = require('./routes/taskRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');
const uri =  'mongodb+srv://batyrhan2211:Batyr1337@cluster0.4myjt5o.mongodb.net/task_management?retryWrites=true&w=majority';




app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: 'secretBatyr', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
  
mongoose.connect(uri).then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


app.use('/', taskRoutes); // taskRoutes
app.use('/', authRoutes); // authRoutes
app.use('/', adminRoutes); // adminRoutes
app.use('/', apiRoutes); // apiRoutes


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});