import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment({ Comments, postId, refreshFuntion, parentCommentId }) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    Comments.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [Comments, parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    Comments.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              comment={comment}
              postId={postId}
              refreshFuntion={refreshFuntion}
            />
            <ReplyComment
              Comments={Comments}
              parentCommentId={comment._id}
              postId={postId}
              refreshFuntion={refreshFuntion}
            />
          </div>
        )}
      </>
    ));
  const onHandChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{
            fontSize: '14px',
            margin: 0,
            color: '#3276bd',
            cursor: 'pointer',
          }}
          onClick={onHandChange}
        >
          View {ChildCommentNumber} more comments
        </p>
      )}

      {OpenReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
