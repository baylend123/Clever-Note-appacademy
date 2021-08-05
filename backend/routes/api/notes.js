const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
require('dotenv').config()

const cors = require('cors')

const { getCurrentUserEmail } = require('../../utils/auth')


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


router.post('/send-mail', cors(), asyncHandler(async (req, res) => {
  const { text } = req.body
  const email = await getCurrentUserEmail(req)
    (email)
  const msg = {
    to: `${email}`,
    from: 'baylendoss12@gmail.com',
    subject: 'Clever-Note',
    html: `${text}`
  }
  const message = await sgMail.send(msg)
    (message)


}))

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    if (req.params.id === 'all') {
      (req.params.id)
      const notes = await db.Note.findAll({
        order: [['updatedAt', 'DESC']]
      }
      ).map(note => note.dataValues)
      res.json(notes)
    } else {


      const id = parseInt(req.params.id, 10);
      if (req.params.id === 'undefined') {
        next()
      }
      const notes = await db.Note.findAll({
        where: {
          noteBookId: id,
        },
        order: [['createdAt', 'DESC']]
      }).map((note) => note.dataValues);
      res.json(notes);
    }
  })
);
router.post(
  '/save',
  asyncHandler(async (req, res) => {
    const { note, noteId } = req.body;

    const parsedId = parseInt(noteId, 10);

    const myNote = await db.Note.findByPk(parsedId);

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
    const newNote = await db.Note.create({
      noteBookId: noteBookId,
      body: note,
    });
    (newNote);

    res.json(newNote);
  })
);
router.post('/delete', asyncHandler(async (req, res) => {
  
  const id = req.body.id
  let note = await db.Note.destroy({
    where: {
      id: id
    },
  })
  
  res.status(200)
}))
module.exports = router;