const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'W7301@jqir#', {
    host: 'localhost',
    dialect: 'mysql'
});
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

module.exports = sequelize;