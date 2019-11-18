const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors =require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connect to database
mongoose.connect(config.database);


//On Connection
mongoose.connection.on('connected', () => {
    console.log('MongoDB is Connected' +config.database);
});

///On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error' +err);
});



const app = express();
const users = require('./routes/users');

// PORT NUMBER
const port = 3000;


//CORS MIDDLEWARE
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));


//BODY PARSER MIDDLEWARE
app.use(bodyparser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);


//INDEX ROUTE
app.get('/', (req, res) =>{
    res.send("Invalid EndPoint");
});

//START SERVER
app.listen(port, () =>{
    console.log('Server Started at port ' +port);
});