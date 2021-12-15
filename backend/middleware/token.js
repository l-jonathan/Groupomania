////////////////////////////////////////////////////////////
/////////////         MIDDLEWARE TOKEN         /////////////
////////////////////////////////////////////////////////////

// Import dependancies
const JWT = require("jsonwebtoken");

// Creation of unique token
function issueJWT(user) {
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, `#.lNG$HjHqqe>1|7$Zb>$CCf/,`, {
    expiresIn: 360000,
  });
  return {
    token: signedToken,
    expires: expiresIn,
  };
}

// Get the id of the token's owner
function getUserId(req) {
  if (req.headers.cookie === undefined) {
    console.log("No token");
  } else {
    const token = req.headers.cookie.substr(4); // on récupère le token de la requête entrante
    const decodedToken = JWT.verify(token, `#.lNG$HjHqqe>1|7$Zb>$CCf/,`); // on le vérifie
    const userId = decodedToken.sub;
    return userId; // on récupère l'id du token
  }
}

// Check if token exist
module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.cookie.substr(4);
  if (token) {
    JWT.verify(
      token,
      `#.lNG$HjHqqe>1|7$Zb>$CCf/,`,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json("no token");
        } else {
          console.log(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("No token");
  }
};

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
