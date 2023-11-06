import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonLike } from '../components/ButtonLike';

export function DealDetail() {
  const [deal, setDeal] = useState(null);
  const { dealId } = useParams();

  useEffect(() => {
    async function fetchDeal() {
      console.log(11111111111111111111111)
      console.log(dealId);
      const response = await fetch(`/api/deals/id?id=${dealId}`);
      if (response.ok) {
        const data = await response.json();
        setDeal(data);
      }
    }

    fetchDeal();
  }, [dealId]);

  if (!deal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{deal.title}</h1>
      <p><strong>Description:</strong> {deal.description}</p>
      <p><strong>Web Link:</strong> <a href={deal.weblink} target="_blank" rel="noopener noreferrer">{deal.weblink}</a></p>
      <p><strong>Image:</strong> <img src={deal.imagelink} alt={deal.title} /></p>
      <p><strong>Category:</strong> {deal.category}</p>
      <ButtonLike deal = {deal}/>
    </div>
  );
}
