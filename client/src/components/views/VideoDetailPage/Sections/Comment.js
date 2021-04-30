import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
function Comment({ postId }) {
  const videoId = postId;
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState('');
  const onChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //정보들을 데이터 베이스에 저장
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };
    axios.post('/api/comment/saveComment', variables).then((r) => {
      if (r.data.success) {
        console.log(r.data.result);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* Comment Lists */}

      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={onChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요."
        ></textarea>
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
