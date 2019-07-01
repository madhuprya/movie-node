
const Sequelize = require('sequelize');

const sequelize = new Sequelize('movies', 'root', 'root', {
  host: '172.17.0.2',
  dialect: 'mysql',
  operatorsAliases: false,
});
module.exports = sequelize;
