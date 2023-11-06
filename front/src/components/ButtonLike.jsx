import PropTypes from "prop-types";
import { useState } from "react";

export function ButtonLike({ deal }) {
  const prevLikes = deal.like?deal.like:0;
  console.log(77777777777777777)
  console.log(deal)
  let [likes, setLikes] = useState(prevLikes);
  

  function onClick() {
    
    setLikes(likes + 1);
    console.log(`Like=${likes}`);
    deal.like = likes;
    console.log(22222222222222)
    console.log(deal)
    

    fetch(`/api/deals/${deal._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like: deal.like }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response from the backend (optional)
        } else {
          // Handle an unsuccessful response, reset the likes on error
          setLikes(likes);
          console.error('Failed to update likes');
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request (e.g., reset the likes on error)
        setLikes(likes);
        console.error('Failed to update likes:', error);
      });
  }

  console.log("render ButtonLike", deal.title, likes);
  return (
    <div>
      <button className="btn btn-primary mb-2" onClick={onClick}>
        Like for {deal.title}
      </button>
      <output>
        {deal.title} has {deal.like} likes
      </output>
    </div>
  );
}
ButtonLike.propTypes = {
  dealname: PropTypes.string.isRequired,
};
