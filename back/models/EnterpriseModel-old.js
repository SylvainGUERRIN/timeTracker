// modèle de données pour les utilisateurs
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Enterprise = sequelize.define("Enterprise", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true,
        },
        benefitType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Enterprise;
};