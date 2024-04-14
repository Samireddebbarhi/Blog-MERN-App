const jwt = require("jsonwebtoken");
const users = require("../Models/users.js");
//const cookie = require("js-cookie");
const bcrypt = require("bcrypt");
//const { cookie } = require("express-validator");

require("dotenv").config();

exports.HandleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send({ error: "You must provide username and password" });

  users.findOne({ username }).then(async (data) => {
    try {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        const Newtoken = jwt.sign(
          { id: data._id, user_name: username },
          process.env.Token_Secret,
          {
            expiresIn: "4m",
          }
        );
        res.cookie("token", Newtoken, {
          httpOnly: true,
          sameSite: "strict",
        });
        res.status(200).json({
          msg: `HI ${username} you connected succefully  with token} `,
          Token: `${Newtoken}`,
        });
      } else
        res.status(401).send({
          error: `Sorry  this ${username} or Password are incorrect `,
        });
    } catch (err) {
      next(err);
    }
  });
};
