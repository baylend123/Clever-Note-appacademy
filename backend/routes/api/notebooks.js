const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.cookies.user);
    const id = parseInt(req.cookies.user, 10);

    const noteBooks = await db.Notebook.findAll({
      where: {
        userId: id,
      },
    });
    const fatTrimmedNoteBooks = noteBooks.map(
      (notebook) => notebook.dataValues
    );

    res.status(200);
    res.json({
      fatTrimmedNoteBooks,
    });
  })
);
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.cookies.user, 10);
    const { title, tag } = req.body;
    const newNoteBook = await db.Notebook.build({
      userId: userId,
      title: title,
      tags: tag,
    });
    await newNoteBook.save();
    res.send(newNoteBook.dataValues);
  })
);

module.exports = router;
