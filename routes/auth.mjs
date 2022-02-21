import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
import User from "../models/User.mjs";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.mjs";
const SECRET = process.env.SECRET || "12345";
router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      User.findOne({ email: req.body.email }, (error, emailExist) => {
        if (emailExist) {
          return res.status(400).send("Sorry this email is already exists");
        } else if (error) {
          res.status(500).send("error in getting database");
        } else {
          stringToHash(req.body.password)
            .then((hashPassword) => {
              let user = User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
              })
                .then((user) => res.send(user))
                .catch((err) => res.json({ error: "enter a unique email" }));
            })
            .catch((e) => console.log(e));
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("internel server error");
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).send("error in getting database");
        } else if (!user) {
          return res.status(400).send("Please try with other credentials");
        } else {
          varifyHash(req.body.password, user.password)
            .then((result) => {
              if (result) {
                let token = jwt.sign(
                  {
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                  },
                  SECRET
                );
                res.send(token);
              } else {
                res.send("Please try with other credentials");
              }
            })
            .catch((e) => res.send("error occurd", e));
        }
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).send("internel server error");
    }
  }
);
router.post("/getuser", fetchuser, (req, res) => {
  try {
    const user = User.findOne({ email: req.user.email }, (err, user) => {
      if (err) {
        res.status(500).send("error in getting database");
      } else if (!user) {
        return res.status(400).send("Please try with other credentials");
      } else {
        res.send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      }
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("internel server error");
  }
});
export default router;
