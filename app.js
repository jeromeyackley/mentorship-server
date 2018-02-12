const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.js');

// CONNECT TO MONGODB
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{console.log('connected to ' + config.database)});
mongoose.connection.on('error', (err)=>{console.log('database error: ' + err)});

// INIT EXPRESS
const app = express();
let port = process.env.PORT || 5000;

// IMPORT ROUTES
const userRoutes = require('./routes/userRoutes.js');
const skillRoutes = require('./routes/skillRoutes.js');

//MIDDLEWARE
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

// USER ROUTES
app.use('/users', userRoutes);
// SKILL ROUTES
app.use('/skills', skillRoutes);

app.route('/')
.get((req,res)=>{
  res.send('hello from server');
});

//START SERVER
app.listen(port,()=>{
  console.log('listening on port ' + port);
});
