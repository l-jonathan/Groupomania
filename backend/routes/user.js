//----------------------- fichier présentant les routes user disponibles -----------------------//

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

// Auth
router.post("/signup", userCtrl.signup); // FONCTIONNE
router.post("/login", userCtrl.login); // FONCTIONNE
router.post("/logout", userCtrl.logout); // Comment faire pour supprimer le token avec jsonwebtoken

// DB User
router.get("/", auth, userCtrl.getAllUsers); //FONCTIONNE
router.get("/:id", auth, userCtrl.getOneUser);
//router.get("/:id", userController.getOneUser);
router.put("/:id", auth, userCtrl.updateUser); // FONCTIONNE
router.delete("/:id", auth, userCtrl.deleteUser); // FONCTIONNE

module.exports = router;
