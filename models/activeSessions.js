const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ActiveSessions extends Model {}

ActiveSessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "active_sessions",
  }
);

module.exports = ActiveSessions;
