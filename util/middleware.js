const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const ActiveSessions = require("../models/activeSessions");

const errorHandler = (error, req, res, next) => {
  console.error("errorHandler: ", error.name, "|", error.message);
  if (error.name === "SeauelizeValidationError") {
    res.status(400).send({ error: error.message });
  } else {
    res.status(500).send({ error: "unknown error" });
  }
  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const activeToken = await ActiveSessions.findOne({ where: { token } });
      if (!activeToken) throw "Token is not active";

      req.decodedToken = jwt.verify(token, SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor, errorHandler };
