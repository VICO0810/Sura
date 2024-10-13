const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./models");
//Importar los controladores
const loginController = require("./controllers/loginController");
const dashboardController = require("./controllers/dashboardController");
// Importar rutas
const loginRouter = require("./Routes/loginRouter");
const dashboardRouter = require("./Routes/dashboardRouter");

// Configurar el motor de vistas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Configurar el directorio de archivos estáticos
app.use(express.static(__dirname + "/src"));

// Configurar el servidor para recibir JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ruta principal
app.get("/", (req, res) => {
  res.render("welcome");
});
// Ruta para el login
app.use("/login", loginRouter);

//Ruta para dashboard
app.use('/dashboard', dashboardRouter);

//Prueba de conexión a la base de datos
// app.get('/prueba', (req, res) => {
//   db.User.findAll().then(users => {
//     res.json(users);
//   });
// });

// Probar la conexión a la base de datos
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
    // Levantar el servidor si la conexión es exitosa
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

module.exports = db;
