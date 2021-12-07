//----------------------- fichier contenant l'application Express -----------------------//

const express = require("express");
const path = require("path");
const config = require("./config/config.json");

//import des routers
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const db = require("./models");
const app = express();

// middleware pour résoudre problèmes de CORS et permettre l'accès à l'API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//middleware global, transforme le corps de la requete en objet javascript utilisable
app.use(express.json());

// gestion ressource images
app.use("/images", express.static(path.join(__dirname, "images")));

// enregistrement du routeur avec racine attendue par front-end
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

// CREATE TABLES IF NO EXIST
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("error: " + err);
  });

module.exports = app;
