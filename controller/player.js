const mobile_legends = require("../models/player");

// function untuk mengambil semua data dari database
const getAllinfo = async (req, res) => {
  try {
    const player = await mobile_legends.findAll();
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// function untuk mengambil data dari database berdasarkan id
const getplayer = async (req, res) => {
  try {
    const player = await mobile_legends.findByPk(req.params.id);
    if (!player)
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// update data berdasarkan id
const updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { hero, role, lane } = req.body;

    // cari data berdasarkan id
    const player = await mobile_legends.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // update data
    player.hero = hero;
    player.role = role;
    player.lane = lane;

    await player.save();

    res.json({ message: "Data berhasil diperbarui", data: player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = {
  getAllinfo,
  getplayer,
  updateInfo,
};
