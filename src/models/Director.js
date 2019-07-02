'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Director = sequelize.define('Director', {    
    Director: DataTypes.STRING(30),
  });
  
  Director.associate = function(models) {    
    Director.hasMany(models.Movie, { onDelete: 'cascade' });
  };
  
  return Director;
};