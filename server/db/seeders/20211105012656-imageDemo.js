'use strict';
const img1 = require('../../demoSSbase64.js')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {name: "demo-screen-shot", bugId: 2, image: img1}  
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
