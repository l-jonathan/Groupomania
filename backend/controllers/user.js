//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------//

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
const token = require("../middleware/token");

// Importation config database avec ORM Sequelize
const db = require("../models/index");

// Importation modèle User
const { User } = db.sequelize.models;

// Temps du token (à supprimer possiblement)
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Obtain all users
module.exports.getAllUsers = async (req, res) => {
  try {
    var users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// Obtain one users
module.exports.getActualUser = async (req, res) => {
  const userId = token.getUserId(req);
  console.log("userId getActualUser: "+userId);

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

// Obtain one users
module.exports.getUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      return res.status(200).json(userFound);
      //console.log(userFound);
      //return userFound;
    })
    .catch((error) =>
      res.status(500).json({ error: "Utilisateur non trouvé !" })
    );
};

// fonction pour enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  // vérifier validation regex mot de passe
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const passwordValue = req.body.password;
  console.log("ceci est le regex: " + passwordRegex.test(passwordValue));
  if (passwordRegex.test(passwordValue) == false) {
    res.status(400).json({
      error:
        "le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial",
    });
  } else {
    // fonction asynchrone de cryptage du mot de passe
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // création instance classe User + enregistrement DB
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        })
          // puis encodage d'un nouveau token
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

exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dan la bdd
    if (!user) {
      return res.status(403).send({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.cookie("jwt", tokenObject.token, { httpOnly: true, maxAge });
        res.status(200).send({
          // on renvoie le user et le token
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
          message: "Bonjour " + user.firstName + " " + user.lastName + "!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Modify one user
module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageProfile: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
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
          .catch((error) =>
            res
              .status(400)
              .json({ error: "⚠ Oops, une erreur s'est produite !" })
          );
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "⚠ Oops, une erreur s'est produite !" })
    );
};

// Delete one user
exports.deleteUser = async (req, res) => {
  const userId = token.getUserId(req);

  db.User.findOne({
    where: { id: userId },
  })

    .then((userFound) => {
      console.log(
        "utilisateur trouvé:" +
          userFound.firstName +
          " id params" +
          req.params.id
      );
      if (userFound && req.params.id == userId) {
        db.User.destroy({ where: { id: userId } }); // on supprime le compte
        res
          .status(200)
          .json({ messageRetour: "utilisateur supprimé" })

          .then((user) =>
            res
              .status(200)
              .json({ message: "Votre profil a bien été supprimé !" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ error: "⚠ Oops, une erreur s'est produite ! 11" })
          );
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error: "⚠ Oops, une erreur s'est produite ! " + error })
    );
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
  //return res.send("Logout successful");
};
