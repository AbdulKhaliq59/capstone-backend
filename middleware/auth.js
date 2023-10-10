const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const handleError = require("../utils/handleError");
dotenv.config();

const isAdmin = (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(403).json({ error: "No Token Provided" });
    }
    const authToken = token.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ error: "Please Login first" });
    }
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
    if (!decoded || decoded.role !== process.env.ADMIN_ROLE) {
      return res.status(403).json({ error: "You are not authorized for this API" });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    handleError(error, res)
  }
};

const isAuthorized = (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(403).json({ error: "No Token Provided" });
    }
    const authToken = token.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ error: "Please Login first" });
    }
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ error: "You are not authorized" });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    handleError(error, res)
  }

}

module.exports = {
  isAdmin,
  isAuthorized
};
