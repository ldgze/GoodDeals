import PropTypes from "prop-types";
import { useState } from "react";

export function ButtonLike({ deal }) {
  const prevLikes = deal.like;
  console.log(77777777777777777)
  console.log(deal)
  let [likes, setLikes] = useState(prevLikes);

  function onClick() {
    console.log(22222222222222)
    setLikes(likes + 1);
    console.log(`Like=${likes}`);
    deal.like = likes;
    

    fetch(`/api/deals/id?id=${deal._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deal }),
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
        {deal.title} has {likes} likes
      </output>
    </div>
  );
}
ButtonLike.propTypes = {
  dealname: PropTypes.string.isRequired,
};
