// on importe le fichier de configuration
const dbConfig = require("../config/db.config.js");

// package Sequelize
const Sequelize = require("sequelize");

// connection à la base de données MySQL
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// consigne l'état de la connexion à la base de données MySQL sur la console
sequelize.authenticate().then(() => {
    console.log('Connection established successfully!');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// on importe le modèle pour les utilisateurs
db.User = require("./UserModel.js")(sequelize, Sequelize);

// on importe le modèle pour les entreprises
db.Enterprise = require("./EnterpriseModel.js")(sequelize, Sequelize);

// on importe le modèle pour les prestations
db.Prestation = require("./PrestationModel.js")(sequelize, Sequelize);

// on connecte les utilisateurs avec les prestations
db.User.hasMany(db.Prestation, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

// on connecte les entreprises avec les prestations
db.Enterprise.hasMany(db.Prestation, {
    foreignKey: 'enterpriseId',
    sourceKey: 'id'
});

// on connecte les posts et les commentaires en fonction de l'id des posts
//db.Post.hasMany(db.Comment, {foreignKey: 'postId', sourceKey: 'id'});
//db.Comment.belongsTo(db.Post, {foreignKey: 'postId', targetKey: 'id'});

// on connecte les posts et les likes en fonction de l'id des posts
//db.Post.hasMany(db.PostLikes, {foreignKey: 'postId', sourceKey: 'id'});
//db.PostLikes.belongsTo(db.Post, {foreignKey: 'postId', targetKey: 'id'});

// on connecte l'utilisateur aux posts en fonction de l'id de l'utilisateur
//db.User.hasOne(db.Post, {foreignKey: 'userId', sourceKey: 'id'});
//db.Post.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'});

// on exporte la base de données
module.exports = db;