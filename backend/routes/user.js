//----------------------- fichier présentant les routes user disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Auth
router.post('/signup', userCtrl.signup); // FONCTIONNE
router.post('/login', userCtrl.login); // FONCTIONNE
//router.get("/logout", userCtrl.logout); // Comment faire pour supprimer le token avec jsonwebtoken

// DB User
router.get("/", userCtrl.getAllUsers); //FONCTIONNE
//router.get("/:id", userController.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser); // FONCTIONNE

module.exports = router;