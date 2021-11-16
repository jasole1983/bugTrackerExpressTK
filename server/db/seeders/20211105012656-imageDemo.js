'use strict';
const img1 = require('../../assets/demoSSbase64.js')
const img2 = require('../../assets/blue-screen-of-death.png')
const img3 = require('../../assets/bluescreen.png')
const img4 = require('../../assets/error_screenshot.gif')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        name: "demo-screen-shot", 
        bugId: 2, 
        image: img1
      },
      {
        name: "demo-screen-shot-2", 
        bugId: 3, 
        image: img2
      },
      {
        name: "demo-SS-3",
        bugId: 4,
        image: img3,
      },
      {
        name: "demo-SS-4",
        bugId: 1,
        image: img4,
      },
       
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
