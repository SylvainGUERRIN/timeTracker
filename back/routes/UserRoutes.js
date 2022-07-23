// package express
const express = require('express');

// création d'un routeur
const router = express.Router();

// contrôleur pour associer la route user
const userController = require('../controlers/UserControler');

// routes de l'API pour les utilisateurs
//router.get('/:id', userController.getOneUser)
router.post('/register', userController.register);
//router.post('/login', userController.login);


// on exporte le router d'authentification des utilisateurs
module.exports = router;