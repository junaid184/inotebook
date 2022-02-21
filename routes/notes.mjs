import express from "express";
import Notes from "../models/Notes.mjs";
import fetchuser from "../middleware/fetchuser.mjs";
import { body, validationResult } from "express-validator";
const router = express.Router();
router.get("/fetchallnotes", fetchuser, (req, res) => {
  try {
    Notes.find({ email: req.user.email }, (err, notes) => {
      if (err) {
        res.status(500).send("error in getting database");
      } else if (!notes) {
        return res.status(400).send("there are no notes");
      } else {
        res.send(notes);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("internel server error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        Notes.create({
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
          email: req.user.email,
          name: req.user.name,
        })
          .then((note) => res.send(note))
          .catch((e) => res.json({ error: "enter a valid note" }));
      } catch (error) {
        console.log(error);
        res.status(500).send("internel server error");
      }
    }
  }
);

export default router;
