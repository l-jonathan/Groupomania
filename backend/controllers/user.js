//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------//

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Importation config database avec ORM Sequelize
const db = require("../models/index");

// Importation modèle User
const { User } = db.sequelize.models;

// Obtain all users
module.exports.getAllUsers = async (req, res) => {
  try {
    var users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// fonction pour enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  // vérifier validation regex mot de passe
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const passwordValue = req.body.password;
  console.log(passwordRegex.test(passwordValue));
  if (passwordRegex.test(passwordValue) == false) {
    res
      .status(400)
      .json({
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
              token: jwt.sign({ userId: user.id }, `${process.env.JWT_KEY}`, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

// fonction pour connecter les users existants
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // on utilise bcrypt pour comparer les hash
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si false, invalide
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // si true, bonne connexion
          res.status(201).json({
            userId: user.id,
            // encodage d'un nouveau token
            token: jwt.sign({ userId: user.id }, `${process.env.JWT_KEY}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modify one user
module.exports.updateUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  const userId = decodedToken.userId;

  req.body.user = userId;

  console.log("bodyUser", req.body.user);
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
module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findOne({ where: { id: id } });
    db.User.destroy({ where: { id: id } }); // on supprime le compte
    res.status(200).json({ messageRetour: "utilisateur supprimé" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
