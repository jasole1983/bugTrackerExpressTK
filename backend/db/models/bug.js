'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bug = sequelize.define('Bug', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 255],
      },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 500],
      },
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 500],
      },
    }, 
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 10]
      },
    },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 10,
        },
      },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInteger: true,
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInteger: true,
      },
    },
  }, {});
  Bug.associate = function(models) {
    
    Bug.belongsTo( models.User, { foreignKey: 'assignedTo' })
    Bug.belongsTo( models.User, { foreignKey: 'createdBy' })
    
  };
  return Bug;
};