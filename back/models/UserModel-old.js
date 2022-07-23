// modèle de données pour les utilisateurs
module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true,
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true,
            validate: {
                // on s'assure que les utilisateurs ne peuvent pas partager la même adresse email
                isUnique(value, next) {
                    const test = User.findOne({
                        //attributes: ['id', 'username', 'email', 'password', 'avatarUrl', 'isAdmin'],
                        where: { email: value }
                    })
                    test.then((res) => {
                        //console.log(res)
                        if(test !== null){
                            return next('User already exist!');
                        }
                    })
                    next()
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return User;
};