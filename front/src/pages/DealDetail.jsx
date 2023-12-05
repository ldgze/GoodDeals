import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteDeal } from "../pages/DeleteDeal";
import { UserContext } from "../components/userContext";
import { Comments } from "../pages/Comments";
import { DealLikes}from './DealLikes';

import "../asset/style/DealDetail.css";

export function DealDetail() {
  const [deal, setDeal] = useState(null);
  // const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { dealId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchDeal() {
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

  // const handleLike = async () => {
  //   if (!user) {
  //     alert("You must be logged in to like a deal.");
  //     return;
  //   }

  //   if (!liked) {
  //     const updatedDeal = { ...deal };
  //     updatedDeal.like += 1;

  //     try {
  //       const response = await fetch(`/api/deals/id/${dealId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ like: updatedDeal.like }),
  //       });

  //       if (response.ok) {
  //         alert("Deal liked successfully!");
  //         setDeal(updatedDeal);
  //         setLiked(true);
  //         setLikes(updatedDeal.like);
  //       } else {
  //         console.error("Error updating deal");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  //   else{
  //     const updatedDeal = { ...deal };
  //     updatedDeal.like -= 1;

  //     try {
  //       const response = await fetch(`/api/deals/id/${dealId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ like: updatedDeal.like }),
  //       });

  //       if (response.ok) {
  //         alert("Cancel liked successfully!");
  //         setDeal(updatedDeal);
  //         setLiked(false);
  //         setLikes(updatedDeal.like);
  //       } else {
  //         console.error("Error updating deal");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const isCreator = user && user.id === deal.creatorId;
  if (user && deal.likedUsers) {
    const liked = deal.likedUsers.indexOf(user.id);
  console.log("lllllllllllllllllaaaaaaaaaaaaa");
  console.log("index", liked);
}
  

  return (
    <div className="container-fluid">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top" />
        <div className="card-body">
          <h2 className="card-title">{deal.title}</h2>
          <p className="card-text">{deal.description}</p>
          <hr className="solid"></hr>
          <div className="card-btn">
          <DealLikes dealId={dealId} initialLikes={deal.like} likedUsers={   
            (user && deal.likedUsers)
          ? 
          (deal.likedUsers.indexOf(user.id)+1): false}/>
              {/* <span onClick={handleLike} className="star-section">
                {liked ? <span className="fa fa-star checked"></span> : <span className="fa fa-star-o unchecked"></span>}{deal.like}
                </span> */}
              {isCreator && (
                <>
            <Link
              to={`/deals/edit/id/${dealId}`}
              className="btn btn-secondary ">
              Edit
            </Link>
            <DeleteDeal dealId={dealId} />
            </>)}
            <p>postby:{deal.creatorName} </p>
          </div>
          <Comments dealId={dealId} user={user} />
        </div>
      </div>
    </div>
  );
}

DealDetail.propTypes = {};
