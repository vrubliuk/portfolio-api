require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) throw new Error();
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (!decodedToken) throw new Error();
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      error,
      message: "Not authenticated"
    });
  }
};
