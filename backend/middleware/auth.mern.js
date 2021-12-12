const jwt = require("jsonwebtoken");
// Importation config database avec ORM Sequelize
const db = require("../models/index");
const middToken = require("../middleware/token");

// Importation modèle User
const { User } = db.sequelize.models;

module.exports.checkUser = (req, res, next) => {
  if (req.headers.cookie === undefined) {
    res.locals.user = null;
    next();
  } else {
    const userId = middToken.getUserId(req);
    const token = req.headers.cookie.substr(4);
    jwt.verify(
      token,
      `#.lNG$HjHqqe>1|7$Zb>$CCf/,`,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          // res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let userCheck = await db.User.findOne({ where: { id: userId }});
          res.locals.user = userCheck;
          next();
        }
      }
    );
  }
};

module.exports.requireAuth = (req, res, next) => {
  if (req.headers.cookie === undefined) {
    console.log("0000No token");
  } else {
    const token = req.headers.cookie.substr(4);
    console.log("1111");
    jwt.verify(
      token,
      `#.lNG$HjHqqe>1|7$Zb>$CCf/,`,
      async (err, decodedToken) => {
        if (err) {
          console.log("2222"+err);
          res.send(200).json("no token");
        } else {
          console.log("3333"+decodedToken.sub);
          next();
        }
      }
    );
  }
};
