const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const notes = await db.Note.findAll({
      where: {
        noteBookId: id,
      },
    }).map((note) => note.dataValues);
    res.json(notes);
  })
);
router.post(
  "/save",
  asyncHandler(async (req, res) => {
    const { note, noteBookId, noteId } = req.body;
    const parsedId = parseInt(noteId, 10);

    const myNote = await db.Note.findByPk(parsedId);
    await myNote.update({
      noteBookId: noteBookId,
      body: note,
    });
    console.log(myNote);
    if (myNote) {
      res.status(200);
      res.send(myNote);
    }
  })
);
module.exports = router;
