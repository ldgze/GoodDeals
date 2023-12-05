import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteDeal } from "../pages/DeleteDeal";
import { UserContext } from "../components/userContext";
import { Comments } from "../pages/Comments";
import { DealLikes}from './DealLikes';

import "../asset/style/DealDetail.css";

export function DealDetail() {
  const [deal, setDeal] = useState(null);
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

  const isCreator = user && user.id === deal.creatorId;
  console.log(user)
  console.log(deal)
//   if (user && deal.likedUsers) {
//     const liked = deal.likedUsers.indexOf(user.id);
// }
  

  return (
    <div className="container-fluid">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top" />
        <div className="card-body">
          <h2 className="card-title">{deal.title}</h2>
          <p className="card-text">{deal.description}</p>
          <p className="card-creator">Postby: {deal.creatorName} </p>
          <hr className="solid"></hr>
          <div className="card-btn">
          <DealLikes dealId={dealId} initialLikes={deal.like} likedUsers={   
            (user && deal.likedUsers)
          ? 
          (deal.likedUsers.indexOf(user.id)+1): false}/>
              {isCreator && (
                <>
            <Link
              to={`/deals/edit/id/${dealId}`}
              className="btn btn-secondary ">
              Edit
            </Link>
            <DeleteDeal dealId={dealId} />
            </>)}
          </div>
          <Comments dealId={dealId} user={user} />
        </div>
      </div>
    </div>
  );
}

DealDetail.propTypes = {};
