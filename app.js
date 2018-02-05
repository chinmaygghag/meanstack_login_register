const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connected to database
mongoose.connect(config.database);

// Connection On
mongoose.connection.on('connected',() =>{
  console.log("connected to database "+config.database);
})

// Connection Error
mongoose.connection.on('connected',(err) =>{
  console.log("Database Error "+err);
})


const users = require('./routes/users');
const app = express();

const port = 3000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

// Index route
app.get('/',(req,res) =>{
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port,() =>{
  console.log("Server started on port "+port);
})
