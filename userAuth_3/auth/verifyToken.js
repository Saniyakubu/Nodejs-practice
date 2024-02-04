import jwt from "jsonwebtoken";

const isTokenValid = (req, res, next) => {
  // console.log(req.cookies.jwt);
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.json({ success: false, msg: "unauthorize" });
    }

    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRETE);
    if (!decodeToken) {
      return res.json({ success: false, msg: "invalid token" });
    }

    req.userId = decodeToken;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default isTokenValid;
