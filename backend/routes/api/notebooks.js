const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Notebook, Note} = require('../../db/models');
const { getCurrentUserId } = require('../../utils/auth')

router.get(
  '/',
  asyncHandler(async (req, res) => {

    const id = await getCurrentUserId(req)
    
    const notebooks = await Notebook.findAll({
      include : {
        model : Note
      },
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200);
    res.json({
      notebooks,
    });
  })
);
router.post(
  '/new',
  asyncHandler(async (req, res) => {
    const userId = await getCurrentUserId(req)
    const { title} = req.body;
    const newNoteBook = await Notebook.build({
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
  await Note.destroy({
    where: {
      noteBookId: noteBookId
    }
  })
  const noteBook = await Notebook.findOne({
    where: {
      id: noteBookId,
    }
  })
  await noteBook.destroy();
  res.sendStatus(200);
}))

module.exports = router;
