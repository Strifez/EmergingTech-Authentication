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

module.exports = router;
