const db = require("../models/index");

exports.informes = async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll();
    res.render("informes", { clientes, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
