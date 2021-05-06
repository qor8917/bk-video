import { Avatar, Button, Comment, Input } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;
function SingleComment({ postId, comment, refreshFuntion }) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //정보들을 데이터 베이스에 저장
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: postId,
      responseTo: comment._id,
    };
    axios.post('/api/comment/saveComment', variables).then((r) => {
      if (r.data.success) {
        refreshFuntion(r.data.result);
        setCommentValue('');
        setOpenReply(false);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem('userID')}
      commentId={comment._id}
    />,
    <span onClick={onClickReplyOpen} key="comment-basic-replay-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} />}
        content={comment.content}
      />

      {OpenReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요."
          ></TextArea>
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
