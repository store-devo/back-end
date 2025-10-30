const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mobile_legends", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // biar query SQL-nya gak muncul di terminal
});

// Tes koneksi
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
