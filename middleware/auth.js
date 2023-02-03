require("dotenv/config");
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(403).json("No Token Provided");
    }
    const authToken = token.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({
        errors: {
          authentication: "Please Login first",
        },
      });
    }
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
    if(decoded.errors || !decoded)
    {
      return res.status(401).json({error:"Failed to Authenticate you"})
    }
    req.user = decoded;
    return next();
  } catch (error) {
    res.status(401).send({ status: "fail", message: "Unauthorized" });
  }
};
module.exports = authenticate;
