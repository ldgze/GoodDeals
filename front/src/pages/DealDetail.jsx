import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DeleteDeal } from '../pages/DeleteDeal';
import { CommentList } from '../pages/CommentList';
import '../asset/style/DealDetail.css';

export function DealDetail() {
  const [deal, setDeal] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { dealId } = useParams();

  useEffect(() => {
    async function fetchDeal() {
      console.log("in detail use param")
      console.log(dealId)
      const response = await fetch(`/api/deals/id/${dealId}`);
      if (response.ok) {
        const data = await response.json();
        setDeal(data);
      } else {
        console.error("Deal not found");  
      }
    } 
    fetchDeal();
    async function fetchComments() {
      const response = await fetch(`/api/deals/id/${dealId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    }
    fetchComments();
  }, [dealId]);
  

  if (!deal) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   async function fetchComments() {
  //     const response = await fetch(`/api/deals/id/${dealId}/comments`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setComments(data);
  //     }
  //   }
  //   fetchComments();
  // }, [dealId]);

  // Handle new comment submission
  const submitComment = async () => {
    const response = await fetch(`/api/deals/id/${dealId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newComment }),
    });
    
    if (response.ok) {
      const response = await fetch(`/api/deals/id/${dealId}/comments`);
      if (response.ok){
        const addedComment = await response.json();
        setComments(addedComment);
      setNewComment(''); // Clear input field after submission
      }
    }
  };

  // Handle delete comment
  const deleteComment = async (commentId) => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      const response = await fetch(`/api/deals/comments/${commentId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Update the comments state to remove the deleted comment
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    }
  };

  const handleLike = async () => {
    if (!liked) {
      const updatedDeal = { ...deal };
      updatedDeal.like += 1; // Increment the like count

      try {
        const response = await fetch(`/api/deals/id/${dealId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({like: updatedDeal.like}),
        });

        if (response.ok) {
          alert('Deal liked successfully!');
          setDeal(updatedDeal);
          setLiked(true); // Mark as liked
          setLikes(updatedDeal.like); // Update like count
        } else {
          console.error("Error updating deal");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top"/>
        <div className="card-body">
          <h1 className="card-title">{deal.title}</h1>
          <p className="card-text">{deal.description}</p>
          <Link to={`/api/deals/edit/id/${dealId}`} className="btn btn-secondary mx-2">Edit</Link>
          <DeleteDeal dealId={dealId} />
          <div>
            <button onClick={handleLike} disabled={liked} className="btn btn-success mx-2">
            Like ({deal.like})
            </button>
            <output>
                {deal.title} has {deal.like} likes
            </output>
          </div>
          <section>
            <h2>Comments</h2>
            {/* <ul>
            {deal.comments.map((comment, index) => (
              <li key={index}>{comment}
              <button onClick={() => handleCommentDelete(index)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul> */}
            {comments.map((comment, index) => (
            <div key={index}>
                <p>{comment.text}</p>
                <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>
            </div>
            ))}
            <div>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here"
            />
            <button onClick={submitComment}>Submit Comment</button>
            </div>
          </section>
        </div>
      </div> 
    </div> 
  );
}

{/* <CommentList comments={comments} onDeleteComment={deleteComment} /> */}
{/*     
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              value={newComment}
              onChange={handleCommentChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Add comment</button>
        </form>
          <div>
          <h3>Comments:</h3>
          <ul>
            {deal.comments.map((comment, index) => (
              <li key={index}>{comment}
              <button onClick={() => handleCommentDelete(index)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div> */}





//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedDeal = { ...deal };
//       updatedDeal.comments.push(newComment); // Add the new comment

//       const response = await fetch(`/api/deals/id/${dealId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify( {comments: updatedDeal.comments}),
//       });

//       if (response.ok) {
//         alert('Comment added successfully!');
//         setDeal(updatedDeal); // Update the local state with the new comment
//         setNewComment(''); // Clear the input field
//       } else {
//         console.error("Error updating deal");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };



//   const handleCommentDelete = (commentIndex) => {
//     const updatedDeal = { ...deal };
//     updatedDeal.comments.splice(commentIndex, 1);

//     // Send a request to the backend to update the comments
//     fetch(`/api/deals/id/${dealId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({comments: updatedDeal.comments}),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert('Comment deleted successfully!');
//           setDeal(updatedDeal);
//         } else {
//           console.error("Error deleting comment");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
