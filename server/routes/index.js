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
    games: ''
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: ''
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
router.post('/login', (req, res, next) => {
  
});

// GET /Register - render the registration view
router.get('/register', (req, res, next) => {
  // Check to see if the user is not already logged index
  if(!req.user){

    //TODO

  } else {
    return res.redirect('/games'); //redirect to games list
  }
});

// POST /Register - process the Register attempt
router.post('/register', (req, res, next) => {
  
});

// GET /Logout - process the Logout response
router.get('/logout', (req, res, next) => {
  
});

module.exports = router;
