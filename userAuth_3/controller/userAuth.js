import personModel from "../model/person.model.js";

const RegisterUser = (req, res) => {
  const { fullName, userName, email } = req.body;

  console.log(fullName, userName, email);
  return res.json({ fullName, userName, email });
};

export { RegisterUser };
