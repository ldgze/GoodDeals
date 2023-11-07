import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DeleteDeal } from '../pages/DeleteDeal';
import '../asset/style/DealDetail.css';

export function DealDetail() {
  const [deal, setDeal] = useState(null);
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
  }, [dealId]);
  

  if (!deal) {
    return <div>Loading...</div>;
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDeal = { ...deal };
      updatedDeal.comments.push(newComment); // Add the new comment

      const response = await fetch(`/api/deals/id/${dealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {comments: updatedDeal.comments}),
      });

      if (response.ok) {
        alert('Comment added successfully!');
        setDeal(updatedDeal); // Update the local state with the new comment
        setNewComment(''); // Clear the input field
      } else {
        console.error("Error updating deal");
      }
    } catch (error) {
      console.error("Error:", error);
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

  const handleCommentDelete = (commentIndex) => {
    const updatedDeal = { ...deal };
    updatedDeal.comments.splice(commentIndex, 1);

    // Send a request to the backend to update the comments
    fetch(`/api/deals/id/${dealId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comments: updatedDeal.comments}),
    })
      .then((response) => {
        if (response.ok) {
          alert('Comment deleted successfully!');
          setDeal(updatedDeal);
        } else {
          console.error("Error deleting comment");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <button onClick={handleLike} disabled={liked}>
          Like
        </button>
        <output>
        {deal.title} has {deal.like} likes
      </output>
      </div>
        </div>
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
      </div>
     </div> 
  );
}
