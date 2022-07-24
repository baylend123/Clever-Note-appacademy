'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Notebook, { foreignKey: 'userId' })
    }
    toSafeObject = function () { // remember, this cannot be an arrow function
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    };
    validatePassword = function (password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    static async login ({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };
    static async signup ({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      validate: {
        len: {
          args: [3, 30],
          msg: "Username must be between 3 and 30 characters long"
        },
        isNotEmail(value) {
          if(value.includes('@')){
            throw new Error('username cannot be an email')
          }
        }
      },
    },
    email: {
      type : DataTypes.STRING,
      validate:{
        maxLen(value){
          if(value.length > 60){
            throw new Error('Email must be less than 60 characters long')
          }
        },
        isEmail : {
          args : true,
          msg : "Please enter a valid email"
        }
      }
    },
    hashedPassword: DataTypes.STRING
  }, {
    sequelize,
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
    modelName: 'User',
  });
  return User;
};