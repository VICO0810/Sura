const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const pdfmake = require("pdfmake");

exports.index = async (req, res) => {
  try {
    const usuarios = await db.User.findAll();
    if (usuarios.length === 0) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }
    res.render("usuarios/index", { usuarios });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = (req, res) => {
  res.render("usuarios/create", { error: null });
};

exports.store = async (req, res) => {
  const { fullname, email, document, phone, rol, description, password } =
    req.body;

  //validar que el usuario no exista ni por su correo ni por su documento
  const user = await db.User.findOne({
    where: { [Op.or]: [{ email: email }, { document: document }] },
  });

  if (user) {
    return res.render("usuarios/create", { error: "Usuario ya registrado" });
  }

  //Crear el usuario
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.User.create({
      fullname,
      email,
      document,
      phone,
      rol,
      description,
      password: passwordHash,
    });
    res.redirect("/usuarios");
  } catch (error) {
    res.render("usuarios/create", { error: error.message });
  }
};

// Función para manejar la edición de usuarios
exports.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.render("usuarios/edit", { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { fullname, email, document, phone, rol, description, password } =
    req.body;

  //Actualizar el usuario
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.User.update(
      {
        fullname,
        email,
        document,
        phone,
        rol,
        description,
        password: passwordHash,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/usuarios");
  } catch (error) {
    res.render("usuarios/edit", { error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.User.destroy({ where: { id: req.params.id } });
    res.redirect("/usuarios");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.pdf = async (req, res) => {
  try {
    const usuarios = await db.User.findAll();
    if (usuarios.length === 0) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }
    const fonts = {
      Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const printer = new pdfmake(fonts);
    const body = [];
    body.push([
      { text: "Nombre", style: "tableHeader" },
      { text: "Correo", style: "tableHeader" },
      { text: "Documento", style: "tableHeader" },
      { text: "Teléfono", style: "tableHeader" },
      { text: "Rol", style: "tableHeader" },
      { text: "Descripción", style: "tableHeader" },
    ]);
    usuarios.forEach((usuario) => {
      body.push([
        usuario.fullname,
        usuario.email,
        usuario.document,
        usuario.phone,
        usuario.rol,
        usuario.description,
      ]);
    });
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { text: "Listado de usuarios", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],
            body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: "black",
        },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
