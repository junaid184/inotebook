import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "12345";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("please authanticate using a valid token");
  } else {
    try {
      const data = jwt.verify(token, SECRET);
      req.user = data;
      next();
    } catch (error) {
      res.status(401).send("please authanticate using a valid token");
    }
  }
};

export default fetchuser;
