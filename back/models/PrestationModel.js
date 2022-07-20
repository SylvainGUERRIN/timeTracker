// modèle de données pour les utilisateurs
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Prestation = sequelize.define("Prestation", {
        start: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        end: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        enterpriseId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Prestation;
};