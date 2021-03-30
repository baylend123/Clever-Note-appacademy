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
    Note.belongsTo(models.Notebook, { foreignKey: 'noteBookId' })
  };
  return Note;
};