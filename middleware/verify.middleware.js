import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = decoded._id;
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(404).json(error);
  }
};
