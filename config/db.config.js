module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "8520",
    DB: "bbi",
    dialect: "postgresql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
