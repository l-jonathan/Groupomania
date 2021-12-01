'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@groupomania.com',
      password: '$2a$09$yA6JgnVgsMfEgFKAJG0IrOpI1IIsN29wtkaW60Jit4Hf4g/aa.T5C',
      admin: true,
      profession: "Chargée de communication",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
