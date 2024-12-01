const db = require("../models/index");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("welcome", {
        message: "Email and password are required",
        error: true,
      });
    }

    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.render("welcome", { message: "User not found", error: true });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("welcome", {
        message: "Invalid password",
        error: true,
      });
    }

    //guardar el usuario en la sesión
    req.session.user = user;

    // Si todo está bien, redirige al usuario o muestra un mensaje de éxito
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error during login:", error);
    res.render("welcome", { message: "Internal server error", error: true });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
