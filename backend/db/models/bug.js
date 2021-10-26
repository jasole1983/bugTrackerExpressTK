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
    assignedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isUUID: 4
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isUUID: 4
      },
    },
  }, {});
  Bug.associate = function(models) {
    
    Bug.belongsTo( models.User, { foreignKey: 'assignedBy' })
    Bug.belongsTo( models.User, { foreignKey: 'createdBy' })
    
  };
  return Bug;
};