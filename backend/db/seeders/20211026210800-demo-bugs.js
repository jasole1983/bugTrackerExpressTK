'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bugs', [
      {name:'Freezes when changing resolution', details:'Starts loading, then crashes after switching to the preset natural resolution', steps:'Load the game and it crashes', version:'V1.14', assignedTo: 4, createdBy: 1, priority:10},
      {name:'Crashes when loading image', details:'Attempting to load a large jpg causes it to freeze and then crash', steps:'Go to add image page.  Add a high-def jpg and it will crash', version:'V1.82', assignedTo: 4, createdBy: 3, priority:5}
    ])

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bugs', null, {});

  }
};
