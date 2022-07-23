// package de cryptage du mot de passe
const bcrypt = require('bcrypt');

// on importe les modèles de données
const db = require("../models");

// on initialise la base de données
const User = db.User;

// package pour la gestion des tokens
const jwt = require('jsonwebtoken');

// enregistrement des nouveaux utilisateurs
exports.register = (req, res, next) => {
    // hash le mot de passe et le sale 10 fois
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //console.log('enregistrement')
            const user = {
                //lastName: req.body.lastName,
                //firstName: req.body.firstName,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                avatarUrl: req.body.avatarUrl,
                isAdmin: req.body.isAdmin
            };
            //console.log("enregistré")

            // on sauvegarde l'utilisateur
            User.create(user)
                .then(data => {
                    //console.log('send data')
                    res.send(data);
                }).catch(error => {
                //console.log(error.original)
                //console.log(error.message)
                res.status(500).json({
                    error: error.message
                });
                //res.send(error.message)
            });
        });
};

// connexion des utilisateurs existant
/*
exports.login = (req, res, next) => {
    console.log(req.body)
    console.log(req.body.email)
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // on compare l'utilisateur déjà enregistré avec celui qui se connecte
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // on retourne une erreur si ce n'est pas valable
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    // on encode les données à l'intérieur du token avec une clé secrète
                    /!*let token = jwt.sign(
                        { userId: user.id }, // ID de l'utilisateur
                        'eyJ1c2VySWQiOjU2LCJpYXQiOjE1OTAxODUwMDYsImV4cCI6MTU5MDI3MTQwNn0', // clé secrète
                        { expiresIn: '24h' } // le token expire après 24H
                    )*!/
                    let token = jwt.sign({
                            //exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            userId: user.id
                        }, 'eyJ1c2VySWQiOjU2LCJpYXQiOjE1OTAxODUwMDYsImV4cCI6MTU5MDI3MTQwNn0',
                        { expiresIn: '24h' }
                    );

                    // on définit le token au sein du header
                    res.setHeader('Authorization', 'Bearer ' + token);

                    // on renvoie l'utilisateur avec son token d'authentification
                    res.status(200).json({
                        userId: user.id,
                        token: token
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};*/
