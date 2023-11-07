import React, { useEffect, useState } from 'react';

function CategoryPage({ match }) {
  const [deals, setDeals] = useState([]);
  const categoryName = match.params.categoryName; // this comes from the route parameter

  useEffect(() => {
    async function fetchDeals() {
      const response = await fetch(`/api/deals/category/${categoryName}`);
      const data = await response.json();
      setDeals(data);
    }

    fetchDeals();
  }, [categoryName]);

  // Render your deals as desired here
  return (
    <div>
      <h1>{categoryName}</h1>
      {deals.map((deal) => (
        <div key={deal._id}>{deal.title} - {deal.description}</div>
      ))}
    </div>
  );
}

export default CategoryPage;
