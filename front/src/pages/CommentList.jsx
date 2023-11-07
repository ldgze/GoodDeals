// CommentList.jsx
import React from 'react';

export function CommentList({ comments, onDeleteComment }){
  return (
    <section>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <button onClick={() => onDeleteComment(comment._id)}>Delete Comment</button>
        </div>
      ))}
    </section>
  );
};
