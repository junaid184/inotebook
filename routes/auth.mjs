import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
import User from "../models/User.mjs";

router.post(
  "/",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.send(user))
      .catch((err) => res.json({ error: "enter a unique email" }));
  }
);

export default router;
