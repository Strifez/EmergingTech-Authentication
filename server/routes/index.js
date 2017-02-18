// Modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Define the User Model
let UserModel =require('../models/users');
let User = UserModel.User; //aliase for User Model - User Object

// Define the Game Model
let game = require('../models/games');

// Create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // Checks if the user is logged 
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next(); // If you are go to the next object
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: '',
    displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: '',
    displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
   });
});

// GET /Login - render the Login view
router.get('/login', (req, res, next) => {
  // Check to see if the user is not already logged index
  if(!req.user){
    //render the Login page
    res.render('auth/login', {
      title: "Login",
      games: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
    });
    return; 
  } else {
    return res.redirect('/games'); //redirect to games list
  }
});

// POST /Login - process the Login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureFlash: "Incorrect Username/Password", // match the loginMessage above
}));

// GET /Register - render the registration view
router.get('/register', (req, res, next) => {
   if(!req.user){
    //render the Register page
    res.render('auth/register', {
      title: "Register",
      games: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
    });
  }
});

// POST /Register - process the Register attempt
router.post('/register', (req, res, next) => {
  User.register(
    new User ({ 
      //coming from the form in the register page
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if(err){
        console.log('error inserting new user');
        if(err.name == "UserExistsError"){
          req.flash('registerMessage', 'Registration Error: User already exists');
        }
        return res.render('auth/register', {
          title: "Register",
          games: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
        })
      }
      // if registration is successful
      return passport.authenticate('local')(req,res, () =>{
        res.redirect('/games');
      });
    });
});

// GET /Logout - process the Logout response
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); //redirect to the home page
});

module.exports = router;
