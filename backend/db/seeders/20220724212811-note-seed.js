'use strict';
const {Notebook, Note}  = require('../models')
const {faker} = require('@faker-js/faker')
const {EditorState, convertToRaw, ContentState} = require('draft-js')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const notebooks = await Notebook.findAll()
   for await (let el of notebooks){
    for await (let i of new Array(50)){
      const text = faker.lorem.paragraph()
      const contentState = ContentState.createFromText(text)
      const state = EditorState.createWithContent(contentState)
      const rawObj = convertToRaw(state.getCurrentContent())
      await el.createNote({body : JSON.stringify(rawObj)})
    }
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
