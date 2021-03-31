const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
console.log('here')
router.get('/:id', asyncHandler(async (req, res) => {
    console.log('here inside handler')
    const param = req.params.id
    console.log(param)
    res.status(200)
    res.json({
        1: 1
    })
}))

module.exports = router