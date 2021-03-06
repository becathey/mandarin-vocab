const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../auth");
const config = require("../config/keys");

module.exports = (server) => {
  server.post("/auth", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);
      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "15m",
      });
      const { iat, exp } = jwt.decode(token);
      // Respond with token
      res.send({ iat, exp, token });
      next();
    } catch (err) {
      // User unauthorized
      return next(new errors.UnauthorizedError(err));
    }
  });
};
