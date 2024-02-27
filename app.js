const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const routes = require('./routes');


const uri =  'mongodb+srv://batyrhan2211:Batyr1337@cluster0.4myjt5o.mongodb.net/atlaspractice?retryWrites=true&w=majority';


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'secretBatyr', 
    resave: false,
    saveUninitialized: false
}));
  

//index page

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});