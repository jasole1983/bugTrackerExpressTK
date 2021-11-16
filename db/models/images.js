'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    bugId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});
  Image.associate = function(models) {
    Image.belongsTo( models.User, { foreignKey: 'userId' })
    Image.belongsTo( models.Bug, { foreignKey: 'bugId' })
  };
  return Image;
};