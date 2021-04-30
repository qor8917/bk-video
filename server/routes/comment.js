const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });
  });
});

module.exports = router;
