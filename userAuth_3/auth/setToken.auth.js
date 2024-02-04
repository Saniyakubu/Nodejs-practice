import jwt from "jsonwebtoken";

const setToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRETE, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default setToken;
