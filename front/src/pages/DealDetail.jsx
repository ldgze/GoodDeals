import { useEffect, useState } from 'react';
import { ButtonLike } from '../components/ButtonLike';
import { useParams, Link } from 'react-router-dom';
import { DeleteDeal } from '../pages/DeleteDeal';

export function DealDetail() {
  const [deal, setDeal] = useState(null);
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

  return (
    <div className="container my-5">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <div className="card-body">
          <h1 className="card-title">{deal.title}</h1>
          <p className="card-text">{deal.description}</p>
          <Link to={`/api/deals/edit/id/${dealId}`} className="btn btn-secondary mx-2">Edit</Link>
          <DeleteDeal dealId={dealId} />
          {/* <ButtonLike deal = {deal}/> */}
        </div>
      </div>
     </div> 

  );
}
