'use strict';
const bcrypt = require('bcrypt')
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
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => 
        (user.password = await bcrypt.hash(user.password, 10))
    },
    sequelize,
    modelName: 'User'
  });

  User.prototype.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};