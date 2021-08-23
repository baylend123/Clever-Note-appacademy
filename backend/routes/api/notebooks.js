const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { getCurrentUserId } = require('../../utils/auth')

router.get(
  '/',
  asyncHandler(async (req, res) => {

    const id = await getCurrentUserId(req)
    
    const noteBooks = await db.Notebook.findAll({
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']]
    });
    let fatTrimmedNoteBooks = await noteBooks.map(
       (notebook) => {
         
        (async () => {
          let awaitNotes = await db.Note.findAll({
          where:{
            noteBookId : notebook.dataValues.id,
                }
          })
          notes = awaitNotes
          notebook.dataValues['notes'] = notes.dataValues
        })()
        return notebook.dataValues
      
      }
    );
    
    res.status(200);
    res.json({
      fatTrimmedNoteBooks,
    });
  })
);
router.post(
  '/new',
  asyncHandler(async (req, res) => {
    const userId = await getCurrentUserId(req)
    const { title} = req.body;
    const newNoteBook = await db.Notebook.build({
      userId: userId,
      title: title,
      tags: 'easter egg',
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
