////////////////////////////////////////////////////////////
/////////////           MODULE USERS           /////////////
////////////////////////////////////////////////////////////

// Import dependancies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const token = require("../middleware/token");

// Import database config
const db = require("../models/index");

// Import User Model
const { User } = db.sequelize.models;

// Token lifetime
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    var users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// Get the logged user
module.exports.getActualUser = async (req, res) => {
  const userId = token.getUserId(req);
  console.log("userId getActualUser: " + userId);

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      res.status(200).json({ message: "Utilisateur trouvé" });
      console.log(userFound);
      return userFound;
    })
    .catch((error) =>
      res.status(500).json({ error: "Utilisateur non trouvé !" })
    );
};

// Get one user
module.exports.getUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      return res.status(200).json(userFound);
    })
    .catch((error) =>
      res.status(500).json({ error: "Utilisateur non trouvé !" })
    );
};

// Register a new user
exports.signup = (req, res, next) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const passwordValue = req.body.password;

  // Verify Regex Password
  if (passwordRegex.test(passwordValue) == false) {
    res.status(400).json({
      error:
        "le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial",
    });
  } else {
    // Password encryption with bcrypt
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // Save the new user in database
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin,
        })
          // Create a new token
          .then((user) => {
            res.status(201).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                `#.lNG$HjHqqe>1|7$Zb>$CCf/,rq!a`,
                {
                  expiresIn: "24h",
                }
              ),
            });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

// Logged an existant user
exports.login = async (req, res) => {
  try {
    // Verify e-mail
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(200).send({ messageMail: "Email incorrect !" });
    } else {
      // Verify password
      const hash = await bcrypt.compare(req.body.password, user.password);
      if (!hash) {
        res.status(200).send({ messagePass: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.cookie("jwt", tokenObject.token, { httpOnly: true, maxAge });
        res.status(200).send({
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
          message: "Bonjour " + user.firstName + " " + user.lastName + "!",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Update one user
module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
      }
    : { ...req.body };

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      if (userFound) {
        db.User.update(userObject, {
          where: { id: userId },
        })
          .then((user) =>
            res
              .status(200)
              .json({ message: "Votre profil a bien été modifié !" })
          )
          .catch((error) => res.status(400).json({ error: "Server error" }));
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Server error" }));
};

// Delete one user
module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      if (userFound && req.params.id == userId) {
        // Delete the user
        db.User.destroy({ where: { id: userId } });
        // Delete the token
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ messageRetour: "utilisateur supprimé" });
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch(res.status(500).json({ error: "Server error" }));
};

// Logout
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
  return res.send("Logout successful");
};
