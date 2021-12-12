const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    console.log("cookie auth.js: " + req.headers.cookie);
    const token = req.headers.cookie.split("=")[1];
    console.log("token auth.js: " + token);
    const decodedToken = jwt.verify(token, `#.lNG$HjHqqe>1|7$Zb>$CCf/,`);
    const userId = decodedToken.userId;
    console.log("userId auth.js: " + userId);
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    console.log("erreur authentification");
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
