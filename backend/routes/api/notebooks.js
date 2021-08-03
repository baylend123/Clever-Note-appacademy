const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { getCurrentUserId } = require("../../utils/auth")

router.get(
  "/",
  asyncHandler(async (req, res) => {

    const id = await getCurrentUserId(req)
    console.log(id)
    const noteBooks = await db.Notebook.findAll({
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']]
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
    const userId = await getCurrentUserId(req)
    const { title, tag } = req.body;
    const newNoteBook = await db.Notebook.build({
      userId: userId,
      title: title,
      tags: tag,
    });
    await newNoteBook.save();
    res.json(newNoteBook);
  })
);
router.post('/delete', asyncHandler(async (req, res) => {
  const noteBookId = req.body.id
  await db.Note.destroy({
    where: {
      noteBookId: noteBookId
    }
  })
  const noteBook = await db.Notebook.findOne({
    where: {
      id: noteBookId,
    }
  })
  await noteBook.destroy();
  res.sendStatus(200);
}))

module.exports = router;
