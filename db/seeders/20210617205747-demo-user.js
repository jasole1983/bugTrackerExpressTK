'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        name: 'Demo Lition',
        hashedPassword: bcrypt.hashSync('password'),
        userName: 'litiond'
      },
      {
        email: faker.internet.email(),
        name: 'Johnny Martir',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        userName: 'martirj',
      },
      {
        email: faker.internet.email(),
        name: 'Antoine Rakamora',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        userName: 'rakamoraa'
      },
      {
        email: 'jl@gmail.com',
        name: 'Jason Leatiota',
        hashedPassword: bcrypt.hashSync('password'),
        admin: true,
        userName: 'leatiotaj',
      },
      {
        email: 'demo@user.com',
        name: 'Devon Straight',
        hashedPassword: bcrypt.hashSync('password'),
        userName: 'straightd',
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      name: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Jason L', 'Devon Straight'] }
    }, {});
  }
};