import setToken from "../auth/setToken.auth.js";
import personModel from "../model/person.model.js";

const RegisterUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.json({ success: false, err: "All field are required" });
    }
    const isUserRegistered = await personModel
      .findOne({ userName })
      .select("-password");
    const isEmailRegistered = await personModel
      .findOne({ email })
      .select("-password");

    if (isUserRegistered) {
      return res.json({ success: false, err: "username already in use" });
    }
    if (isEmailRegistered) {
      return res.json({ success: false, err: "email already in use" });
    }
    const createNewUser = await personModel.create({
      userName,
      email,
      password,
    });
    if (!createNewUser) {
      return res.status(401).json({ success: false, err: "invalid data" });
    }

    setToken(createNewUser._id, res);
    return res.json({ success: true, msg: "Account Created" });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const logUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, err: "All field are required" });
  }
  const findUser = await personModel.findOne({ email });
  if (!findUser) {
    return res.json({
      success: false,
      err: "email or password is incorrect",
    });
  }

  if (findUser.password !== password) {
    return res.json({
      success: false,
      err: "email or password is incorrect",
    });
  }
  console.log(process.env.TOKEN_SECRETE);

  setToken(findUser._id, res);
  return res.json({ success: true, msg: "you've logged in your account" });
};

const getUsers = async (req, res) => {
  console.log("user_id", req.userId);
  const findusers = await personModel.find({});

  return res.json(findusers);
};

export { RegisterUser, logUser, getUsers };
