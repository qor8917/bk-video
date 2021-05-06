const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  Like.find(variables).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});
router.post('/getDislikes', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  Dislike.find(variables).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});
router.post('/upLike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  //Like db에 클릭 정보를 넣는다
  const like = new Like(variables);
  like.save((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
  });
  //만약에 dislike가 이미 클릭이 되어 있다면 dislkike를 1 줄여준다
  Dislike.findOneAndDelete(variables).exec((err, dislikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
router.post('/unLike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  //라이크의 정보를 db에서 삭제
  Like.findOneAndDelete(variables).exec((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post('/unDislke', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  //싫어요를 취소
  Dislike.findOneAndDelete(variables).exec((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post('/dislike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { videoId: req.body.postId };
  } else {
    variables = { commentId: req.body.commentId };
  }
  //Dislike db에 클릭 정보를 넣는다
  const dislike = new Dislike(variables);
  dislike.save((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
  });
  //만약에 like가 이미 클릭이 되어 있다면 like를 1 줄여준다
  Like.findOneAndDelete(variables).exec((err, dislikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
module.exports = router;
