const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/favorits');

router.post('/favoriteNumber', (req, res) => {
  const { movieId } = req.body;
  //몽고db에서 favorite 숫자를 가져오기
  Favorite.find({ movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    //그 다음에 프론드에 다 시 숫자 정보를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post('/favorited', (req, res) => {
  const { movieId, userFrom } = req.body;

  //내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
  //몽고db에서 favorite 숫자를 가져오기
  Favorite.find({ movieId, userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    //그 다음에 프론드에 정보를 보내주기
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post('/removeFromFavorite', (req, res) => {
  const { movieId, userFrom } = req.body;

  Favorite.findOneAndDelete({ movieId, userFrom }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post('/addToFavorite', (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
router.post('/getFavoritedMovies', (req, res) => {
  const { userFrom } = req.body;
  Favorite.find({ userFrom }).exec((err, favorited) => {
    if (err) return res.status(400).send(err);
    //그 다음에 프론드에 정보를 보내주기
    res.status(200).json({ success: true, favorited });
  });
});

router.post('/removeFromFavoriteOnList', (req, res) => {
  const { movieId, userFrom } = req.body;

  Favorite.findOneAndDelete({ movieId, userFrom }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
