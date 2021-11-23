'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bug = sequelize.define('Bug', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Bug.associate = function(models) {
    
    Bug.belongsTo( models.User, { foreignKey: 'assignedTo' })
    Bug.belongsTo( models.User, { foreignKey: 'createdBy' })
    
  };
  return Bug;
};