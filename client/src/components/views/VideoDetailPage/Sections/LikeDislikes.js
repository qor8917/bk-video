import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LikeDislikes({ video, postId, userId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variables = {};

  if (video) {
    variables = { postId, userId };
  } else {
    variables = { commentId, userId };
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variables).then((r) => {
      if (r.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(r.data.likes.length);
        //내가 이미 그 좋아요를 눌렀는지
        r.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Likes에 정보를 가져오지 못했습니다.');
      }
    });
    axios.post('/api/like/getDislikes', variables).then((r) => {
      if (r.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(r.data.dislikes.length);
        //내가 이미 그 싫어요를 눌렀는지
        r.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Dislikes에 정보를 가져오지 못했습니다.');
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      //초기상태
      axios.post('/api/like/upLike', variables).then((r) => {
        if (r.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');
          if (DislikeAction) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert('Like를 올리지 못했습니다');
        }
      });
    } else {
      //이미 좋아요를 누른 상태
      axios.post('/api/like/unLike', variables).then((r) => {
        if (r.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert('unLike를 하지 못했습니다');
        }
      });
    }
  };
  const onDisLike = () => {
    if (DislikeAction !== null) {
      //싫어요가 이미 눌러져 있는 상태
      axios.post('/api/like/unDislke', variables).then((r) => {
        if (r.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('싫어요를 하지 못했습니다');
        }
      });
    } else {
      //싫어요가 눌려져 있지 않은 상태
      axios.post('/api/like/dislike', variables).then((r) => {
        if (r.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction('disliked');
          if (Likes) {
            setLikes(Likes - 1);
            setLikeAction(null);
          }
        } else {
          alert('싫어요를 하지 못했습니다');
        }
      });
    }
  };

  return (
    <div>
      <span ket="comment-basic-like">
        <Tooltip title="Like">
          <LikeTwoTone
            twoToneColor={LikeAction === 'liked' ? '#597ef7' : '#cccccc'}
            onClick={onLike}
            style={{ marginLeft: '8px', fontSize: '16px' }}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'pointer' }}>{Likes}</span>
      </span>
      <span ket="comment-basic-like">
        <Tooltip title="Dislike">
          <DislikeTwoTone
            twoToneColor={DislikeAction === 'disliked' ? '#f759ab' : '#cccccc'}
            onClick={onDisLike}
            style={{ marginLeft: '8px', fontSize: '16px' }}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'pointer' }}>
          {Dislikes}
        </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
