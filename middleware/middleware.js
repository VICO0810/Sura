//middleware para verificar si el usario esta autenticado
module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/welcome");
  },
};
