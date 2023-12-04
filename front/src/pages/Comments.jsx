import { useState, useEffect } from 'react';

export function Comments({ dealId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
        const response = await fetch(`/api/deals/id/${dealId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
          console.log("in comment component", comments)
        }
      }
      fetchComments();
    }, [dealId]);

    const submitComment = async () => {
        if (!user) {
            alert("You must be logged in to post a comment.");
            return;
          }

        if (newComment) {
          try {
            const commentData = {
                text: newComment,
                userId: user.id,
                username: user.username
              };
              console.log("in submit", commentData)
        
            const response = await fetch(`/api/deals/id/${dealId}/comments`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(commentData),
            });
    
            if (response.ok) {
              const updatedResponse = await fetch(
                `/api/deals/id/${dealId}/comments`,
              );
              if (updatedResponse.ok) {
                const updatedData = await updatedResponse.json();
                setComments(updatedData);
              }
    
              setNewComment("");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };
    
      const deleteComment = async (commentId) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this comment?",
        );
        if (confirmed) {
          const response = await fetch(`/api/deals/comments/${commentId}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            setComments(comments.filter((comment) => comment._id !== commentId));
          }
        }
      };

  return (
    <div>
      {user && (
          <div className="comment-form">
          <form>
            <h3>Write Comments</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
              required
            />
            <button onClick={submitComment}>Submit Comment</button>
          </form>
        </div>
      )}

       <section className="comment-section">
       <h3>Comments</h3>
       <hr className="solid"></hr>
        {comments.map((comment, index) => (
          <div key={index} className="comments">
            <p>{comment.username}: {comment.text}</p>
            {user && user.id === comment.userId && (
              <button onClick={() => deleteComment(comment._id)}>
                Delete Comment
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}