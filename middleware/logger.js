const fs = require("fs");
const path = require("path");

// Buat folder logs kalau belum ada
const logPath = path.join(__dirname, "../logs");
if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

const logger = (req, res, next) => {
  const time = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const origin = req.headers.origin || "unknown origin";
  const ip = req.ip || req.connection.remoteAddress;

  const logMessage = `[${time}] ${method} ${url} | Origin: ${origin} | IP: ${ip}\n`;

  // Simpan ke file log
  fs.appendFile(path.join(logPath, "access.log"), logMessage, (err) => {
    if (err) console.error("Gagal menulis log:", err);
  });

  console.log(logMessage.trim()); // juga tampil di console
  next();
};

module.exports = logger;
