
const express = require('express')
const db = require('../database');
const bcrypt = require('bcryptjs');
const router = express.Router()

// const { protectedRoute } = require('../middleware/protected');

// GET all users
router.get('/', (req, res) => {
   // pg-promise
   db.any('SELECT * FROM users')
     .then((users) => {
       // if success;
       console.log(users);

       res.render('pages/allUsers', { users, title: 'ALL users' });
     })
     .catch((error) => {
       // error;
       console.log(error);
       res.redirect('/error?message=' + error.message);
     });
 });

  // GET User form
  router.get('/addnewuser', (req, res) => {

    res.render('pages/newUser', { title: 'New Users' });
  });


 // GET specific users
 router.get('/:user_id', (req, res) => {
   const index = req.params.user_id;
   db.oneOrNone('SELECT * FROM users WHERE id = $1', [index])
     // const user = users[index];
     .then((specificUser) => {
       // fail
       if (!specificUser) {
         res.render('pages/error', {
           error: 'No such user',
           title: 'User'
         });
       } else {
         // success;
         console.log(specificUser);
         res.render('pages/specificUser', { user: specificUser });
       }
     })
     .catch((error) => {
       // error;
       console.log(error);
       res.render('pages/error', {
         error,
         title: 'User'
       });
     });
 });





 module.exports = router