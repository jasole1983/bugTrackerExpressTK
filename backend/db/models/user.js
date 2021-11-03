'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('./db');
const { STRING } = require('sequelize');
const { picture, backgroundImage } = require('./attch.js')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  },
  );
  
  picture.addTo(User);
  backgroundImage.addTo(User);

  User.prototype.toSafeObject = function() { 
    const { id, name, email } = this;
    return { id, name, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ email, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
                
          email: email,
        },
      },
    );
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      name,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    
    User.hasMany( models.Bug, { foreignKey: 'assignedTo' })
    User.hasMany( models.Bug, { foreignKey: 'createdBy' })
  };

return User;
};
