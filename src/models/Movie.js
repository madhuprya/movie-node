'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Movie = sequelize.define('Movie', {
    Rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: DataTypes.STRING(3000),
    Runtime: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Genre: DataTypes.STRING(30),
    Rating: {
      type: DataTypes.FLOAT(11),
      allowNull: false,
    },
    Metascore: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Votes: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    Gross_Earning_in_Mil: {
      type: DataTypes.FLOAT(11),
      allowNull: false,
    },
    Actor: DataTypes.STRING(30),
    Year: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
  });
  Movie.associate = function (models) {
    Movie.belongsTo(models.Director);
  };
  
  
  return Movie;
};

