'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    noteBookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Note.associate = function (models) {
    // associations can be defined here
  };
  return Note;
};