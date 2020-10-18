const jwt = require("jsonwebtoken");

//it will verify that the coming token is valid or not
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();//if verification succeds then next()
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
