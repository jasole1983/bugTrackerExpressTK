'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        name: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        name: 'Johnny Martir',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        name: 'Antoine Rakamora',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'jl@gmail.com',
        name: 'Jason L',
        hashedPassword: bcrypt.hashSync('password'),
        admin: true,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      name: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Jason L'] }
    }, {});
  }
};