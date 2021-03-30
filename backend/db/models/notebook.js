'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteBook = sequelize.define('NoteBook', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  NoteBook.associate = function (models) {
    // associations can be defined here
  };
  return NoteBook;
};