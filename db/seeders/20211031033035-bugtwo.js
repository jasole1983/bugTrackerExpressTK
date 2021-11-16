'use strict';
const n = () => Math.floor(Math.random() * 4)


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bugs', [
      {
        name: "Login failing to take you to home page",
        details: "When filling out the login info, once you press submit, it simply stays on the same login screen",
        steps: "Go to website > click the login button > fill out the login inputs > click submit",
        version: "v0.1",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
      {
        name: "Random text filler",
        details: "This is a phony bug meant for demonstration purposes only.  Please don't try to fix it",
        steps: "Click on Home > talk to the guy on the corner in the yellow poncho, aka Larry",
        version: "v0.1234",
        priority: n(),
        assignedTo: 4,
        createdBy: n(),

      },
  
    ])
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bugs', {
      name: { [Op.in]: ["Random text filler", "Login failing to take you to home page" ] }
    }, {});
  }
};
