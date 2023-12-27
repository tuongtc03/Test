"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ĐỊNH NGHĨA KHÓA NGOẠI Ở ĐÂY
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData'})
      Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData'})
    }
  }
  Allcode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
