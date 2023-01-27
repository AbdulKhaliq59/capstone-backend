require('dotenv/config')
const jwt =require('jsonwebtoken');
const authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send({ status: "fail", message: "Unauthorized" });
    }
  };
  module.exports=authenticate;