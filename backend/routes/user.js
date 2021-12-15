//----------------------- fichier présentant les routes user disponibles -----------------------//

const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// Auth
router.post("/signup", userCtrl.signup); // FONCTIONNE
router.post("/login", userCtrl.login); // FONCTIONNE
router.get("/logout", userCtrl.logout); // Comment faire pour supprimer le token avec jsonwebtoken

// DB User
router.get("/allUsers", userCtrl.getAllUsers); //FONCTIONNE
router.get("/actualUser", userCtrl.getActualUser);
router.get("/:id", userCtrl.getUser);
router.put("/:id", userCtrl.updateUser); // FONCTIONNE
router.delete("/:id", userCtrl.deleteUser); // FONCTIONNE

module.exports = router;
