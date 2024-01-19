const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("Unauthorized: Missing token");
    }

    const user = await User.findByToken(token);

    if (!user) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Forbidden: You shall not pass!");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
