const Sequelize = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('node-complete', 'root', 'W7301@jqir#', {
  host: 'localhost',
  dialect: 'mysql' 
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
