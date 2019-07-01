

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
// const logger = require('../utils/logging');


const Movie = sequelize.define('movie', {
  Rank: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: Sequelize.STRING(3000),
  Runtime: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  Genre: Sequelize.STRING(30),
  Rating: {
    type: Sequelize.FLOAT(11),
    allowNull: false,
  },
  Metascore: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  Votes: {
    type: Sequelize.BIGINT(11),
    allowNull: false,
  },
  Gross_Earning_in_Mil: {
    type: Sequelize.FLOAT(11),
    allowNull: false,
  },
  Actor: Sequelize.STRING(30),
  Year: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
  },
});
// Movie.associate = function (models) {
//   Movie.belongsTo(models.Director, {
//     foreignKey: 'direct',
//     onDelete: 'CASCADE',
//   });
// };
module.exports = Movie;
