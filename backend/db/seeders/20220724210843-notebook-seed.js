'use strict';
const { User, Notebook } = require('../models')
const {faker} = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await User.findOne({
      where : {
        email : 'demo@email.com'
      }
    })

    for await (let i of new Array(10)){
      await user.createNotebook({title : faker.lorem.word()})
    }
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Notebooks', null, {});
  }
};
