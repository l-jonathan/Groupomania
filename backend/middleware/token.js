const JWT = require("jsonwebtoken");
const config = require("../config/config");

function issueJWT(user) {
  // on génére le token
  const id = user.id;
  console.log("userId Token.js: " + user.id);
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
function getUserId(req) {
  // on vérifie le userId du token
  if (req.headers.cookie === undefined) {
    console.log("No token");
  } else {
    const token = req.headers.cookie.substr(4); // on récupère le token de la requête entrante
    const decodedToken = JWT.verify(token, `#.lNG$HjHqqe>1|7$Zb>$CCf/,`); // on le vérifie
    const userId = decodedToken.sub;
    console.log("userId token.js: " + userId);
    return userId; // on récupère l'id du token
  }
}

/*module.exports.requireAuth = (req, res, next) => {
  if (req.headers.cookie === undefined) { 
    console.log("No token");
  } else {
    var token = req.headers.cookie.substr(4);
    if (token != null) {
    JWT.verify(
      token,
      `#.lNG$HjHqqe>1|7$Zb>$CCf/,`,
      async (err, decodedToken) => {
        if (err) {
          console.log("error requireAuth: " + err);
          res.send(200).json("no token");
        } else {
          console.log("id token requireAuth: " + decodedToken.sub);
          const id = decodedToken.sub;
          return id;
        }
      }
    );
  } else {
    console.log("No token");
  }
  }
  
};*/

module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.cookie.substr(4);
  if (token) {
    JWT.verify(token, `#.lNG$HjHqqe>1|7$Zb>$CCf/,`, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};


module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
