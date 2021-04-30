const express = require('express');
const router = express.Router();
const { Subscribe } = require('../models/Subscribe');

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
  Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});
router.post('/subscribed', (req, res) => {
  Subscribe.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
    (err, subscribe) => {
      if (err) return res.status(400).send(err);
      //false 면 미구독 true 면 구독상태
      let result = false;
      if (subscribe.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, subscribed: result });
    }
  );
});
router.post('/unSubscribe', (req, res) => {
  //데이터베이스에서 찾아서 삭제
  Subscribe.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post('/subscribe', (req, res) => {
  //데이터베이스에 추가
  const subscribe = new Subscribe(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
