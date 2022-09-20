const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models');
require('dotenv').config()
const cors = require('cors')


router.get('/all', async (req, res) => res.json(await Note.findAll()))
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    if (req.params.id === 'all') {
      res.json(await Note.findAll({ order: [['updatedAt', 'DESC']] }))
    } else {
      const id = parseInt(req.params.id, 10);
      if (req.params.id === 'undefined') {
        next()
      }
      res.json(await Note.findAll({
        where: { noteBookId: id, },
        order: [['createdAt', 'DESC']]
      }));
    }
  })
);
router.post(
  '/save',
  asyncHandler(async (req, res) => {
    const { note, noteId } = req.body;


    const parsedId = parseInt(noteId, 10);

    const myNote = await Note.findByPk(parsedId);

    if (myNote) {
      await myNote.update({
        body: note,
      });

      res.status(200);
      res.send(myNote);
    }

  })
);

router.post(
  '/new',
  asyncHandler(async (req, res) => {
    const { note, noteBookId } = req.body;
    console.log(note, noteBookId)
    let newNote
    try {
      newNote = await Note.create({
        noteBookId: noteBookId ? noteBookId : 1,
        body: note,
      });
    }

    catch (err) {
      console.log(err)
    }

    res.json(newNote);
  })
);
router.post('/delete', asyncHandler(async (req, res) => {
  const { id } = req.body
  const noteId = parseInt(id, 10)

  let noteDel = await Note.destroy({
    where: {
      id: noteId
    },
  })

  res.json(noteDel)
}))
module.exports = router;