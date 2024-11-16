const jwt = require("jsonwebtoken");
const JWT_Secret = "RohanIs#1";
const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    // Rest of your middleware logic
  
  
  try {
    const data = jwt.verify(token, JWT_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
};

module.exports = fetchuser;
