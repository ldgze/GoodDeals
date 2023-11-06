import { useEffect, useState } from 'react';
import { ButtonLike } from '../components/ButtonLike';
import { useParams, Link } from 'react-router-dom';


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
        // history.push('/');        
      }
    } 

    fetchDeal();
  }, [dealId, history]);

  if (!deal) {
    return <div>Loading...</div>;
  }

  // console.log("in Detail")
  // console.log(deal)

  return (
    <div className="container my-5">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <div className="card-body">
          <h1 className="card-title">{deal.title}</h1>
          <p className="card-text">{deal.description}</p>
          <Link to={`/edit/${dealId}`} className="btn btn-secondary mx-2">Edit</Link>
          <button onClick={() => { if (window.confirm('Are you sure you want to delete this deal?')) { /* implement deletion logic */ }}} className="btn btn-danger">Delete</button>
          <ButtonLike deal = {deal}/>
        </div>
      </div>
     </div> 


  );
}

  

//   return (
//     <div>
//       <h1>{deal.title}</h1>
//       <p><strong>Description:</strong> {deal.description}</p>
//       <p><strong>Web Link:</strong> <a href={deal.weblink} target="_blank" rel="noopener noreferrer">{deal.weblink}</a></p>
//       <p><strong>Image:</strong> <img src={deal.imagelink} alt={deal.title} /></p>
//       <p><strong>Category:</strong> {deal.category}</p>
//     </div>
//   );
// }
