import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';
const { TextArea } = Input;
function Comment({ postId, Comments, refreshFuntion, history }) {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState('');
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //정보들을 데이터 베이스에 저장
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId,
    };
    axios.post('/api/comment/saveComment', variables).then((r) => {
      if (r.data.success) {
        console.log(r.data.result);
        refreshFuntion(r.data.result);
        setCommentValue('');
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
      {Comments &&
        Comments.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={index}
                  postId={postId}
                  comment={comment}
                  refreshFuntion={refreshFuntion}
                  history={history}
                />
                <ReplyComment
                  Comments={Comments}
                  refreshFuntion={refreshFuntion}
                  postId={postId}
                  parentCommentId={comment._id}
                  history={history}
                />
              </>
            )
        )}
      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={onChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요."
        ></TextArea>
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
