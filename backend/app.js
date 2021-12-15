/////////////////////////////////////////////////////////////
/////////////        EXPRESS APPLICATION        /////////////
/////////////////////////////////////////////////////////////

// Import dependancies
const express = require("express");

// Import middleware of authentification
const { checkUser, requireAuth } = require("./middleware/auth");

// Import routers
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// Import models
const db = require("./models");

// Create application
const app = express();

// Resolve CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Transform request to json
app.use(express.json());

// Token authentification
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  const id = res.locals.user.id;
  res.status(200).json(id);
});

// Router path, use by the frontend
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

// Create tables if doesn't exists
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
