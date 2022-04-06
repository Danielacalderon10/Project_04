// 1.
//--- Express module
require('dotenv').config();
const express = require('express');
// ---Initialise express server
const app = express();
// -- create port variable
const PORT = 3000 || process.env.PORT;


// 2. 
//import libraries and data
const path = require('path');
let morgan = require('morgan');
let bcrypt = require('bcryptjs');
let ejs = require('ejs');
const db = require('./database')

//import routes
const homeRouter = require("./routes/home.js")
const usersRouter = require("./routes/users.js")
const errorRouter = require("./routes/error.js")


//3.
//---middleware
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))) 

//bodypaser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//LogingMiddeare
app.use(morgan('dev'));

//ejs config
app.set('view engine', 'ejs') // sets ejs as view engine
app.set('views', './views') // sets 'views' folder as teh folder for grabbing templates when res.rendering


//4.
//--- Routes
app.use('/', homeRouter)
app.use('/users', usersRouter)
app.use('*', errorRouter)





//5
// listen to express

  app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
  });

