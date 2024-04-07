const users = require("../Models/users");
const bcrypt = require("bcrypt");
const validationResult = require("express-validator").validationResult;
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;

    let hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new users({
      username: user.username,
      password: hashedPassword,
    })
      .save()
      .then(() => res.status(200).send(`User added succefully`));
  } catch (err) {
    console.log(err);
  }
};
