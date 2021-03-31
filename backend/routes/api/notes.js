const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const notes = await db.Note.findAll({
        where: {
            noteBookId: id
        }
    }).map(note => note.dataValues)
    res.json(
        notes
    )
}))
module.exports = router