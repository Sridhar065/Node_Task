import jwt from "jsonwebtoken";
const settings = require("../config/app.config");
class middleware {
  async authToken(req, res, next) {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer") !== undefined) {
      // Remove Bearer from string
      token = token.slice(7, token.length);

      if (token) {
        jwt.verify(token, settings.config.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              status: 401,
              content: "",
              message: "Token is not valid",
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        content: "",
        message: "Auth token is not supplied",
      });
    }
  }
}

export default new middleware();
