
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Director = sequelize.define('director', {
  Director: Sequelize.STRING(30),
});
// Director.associate = function (models) {
 
// };
module.exports = Director;
