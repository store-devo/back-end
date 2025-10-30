const express = require("express");
const sequelize = require("./config/db");
const mobile_legends = require("./models/player");
const playerController = require("./controller/player");
const cors = require("cors");
const logger = require("./middleware/logger");

// daftar website yang diizinkan
const allowedOrigins = [
  "http://localhost:3000",
  "https://127.0.0.1:3000",
  "https://store-devo.github.io/players/",
];

// konfigurasi CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Akses dari website ini tidak diizinkan!"));
      console.log("harus izin hak akses");
    }
  },
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// sinkronisasi model ke database
sequelize.sync().then(() => {
  console.log("✅ Models synced with database");
});

// middleware monitoring yang akses endpoint
app.use(logger); // <---- pasang middleware di sini

// endpoint GET semua user
app.get("/mobile_legends", playerController.getAllinfo);

// endpoint GET untuk berdasarkan id
app.get("/mobile_legends/:id", playerController.getplayer);

// endpoint PATCH untuk update data
app.put("/mobile_legends/:id", playerController.updateInfo);

app.listen(8000, () => {
  console.log("🚀 Server running on port 8000");
});
