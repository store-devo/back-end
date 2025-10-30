const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// definisi tabel users
const mobile_legends = sequelize.define(
  "mobile_legends",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lane: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "mobile_legends", // nama tabel di MySQL
    timestamps: false, // kalau kamu gak punya kolom createdAt & updatedAt
  }
);

module.exports = mobile_legends;
