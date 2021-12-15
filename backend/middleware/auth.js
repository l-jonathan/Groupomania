/////////////////////////////////////////////////////////////
/////////////    MIDDLEWARE AUTHENTIFICATION    /////////////
/////////////////////////////////////////////////////////////

// Import dependancies
const jwt = require("jsonwebtoken");
const middToken = require("./token");

// Import database config
const db = require("../models/index");

// Check if user logged is the token's owner
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
          next();
        } else {
          let userCheck = await db.User.findOne({ where: { id: userId } });
          res.locals.user = userCheck;
          next();
        }
      }
    );
  }
};

// Check if token exist
module.exports.requireAuth = (req, res, next) => {
  if (req.headers.cookie === undefined) {
    console.log("no token");
  } else {
    const token = req.headers.cookie.substr(4);
    jwt.verify(
      token,
      `#.lNG$HjHqqe>1|7$Zb>$CCf/,`,
      async (err, decodedToken) => {
        if (err) {
          res.send(200).json("no token");
        } else {
          next();
        }
      }
    );
  }
};
