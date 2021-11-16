'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

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
    userName: {
      type: DataTypes.STRING(35),
      allowNull: false,
      validate: {
        len: [3, 35]
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
  
  User.prototype.toSafeObject = function() { 
    const { id, name, email, userName } = this;
    return { id, name, email, userName };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: [
          { userName: credential },
          { email: credential }
        ]        
        },
      },
    );
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.generate = function (name) {
    const names = name.toLowerCase().split(' ')
    const first = names[0].slice(0, 30)
    const mid = (names[2])? names[1][0]:null
    const last = (names[2])? names[2][0]:names[1][0]
    const un = `${first}${last}${mid?mid:""}`
    return un
  }

  User.signup = async function ({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const userName = User.generate(name)
    const user = await User.create({
      name,
      email,
      hashedPassword,
      userName,
      admin: false,
    });
    
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    
    User.hasMany( models.Bug, { foreignKey: 'assignedTo' })
    User.hasMany( models.Bug, { foreignKey: 'createdBy' })
    User.hasMany( models.Image, { foreignKey: 'userId' })

  };

return User;
};
