// configuration de MySQL et de Sequelize
module.exports = {
    HOST: "localhost",
    PORT: 8889,
    USER: "root",
    PASSWORD: "root",
    DB: "time-tracker",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};