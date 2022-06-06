// package express
const express = require('express');

// package express-sanitizer
//const expressSanitizer = require('express-sanitizer');

// accès aux répertoires
const path = require('path');

// déclaration de la route pour l'authentification
//const userRoutes = require('./routes/user');

//déclaration de la route pour le profil
//const profileRoutes = require('./routes/profile')

//déclaration des routes pour les posts
//const postsRoutes = require('./routes/post')

// on créé l'application express
const app = express();

// middleware qui permet l'accès à toutes les origines d'accéder à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// middleware d'express qui traîte les données du cors de la requête en objet JavaScript utilisable
app.use(express.json());

// middleware qui filtre les chaînes de caractères pour empêcher l’exécution de code JavaScript (XSS)
//app.use(expressSanitizer());

// middleware qui définit la route pour l'authentification
//app.use('/api/auth', userRoutes);

// middleware qui définit la route pour le profil utilisateur
//app.use('/api/profile', profileRoutes);

// middleware qui définit la route pour les posts
//app.use('/api/posts', postsRoutes);

module.exports = app