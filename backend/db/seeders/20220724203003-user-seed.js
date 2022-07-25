'use strict';
const { User } = require('../models')
const {faker} = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    for await (let i of new Array(10)){
      await User.signup({email: faker.internet.email(), username:faker.internet.userName(), password:'password'})
    }
    await User.signup({email: 'demo@email.com', username:'demo-user', password:'password'})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true });
  }
};
