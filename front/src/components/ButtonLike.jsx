import PropTypes from "prop-types";
import { useState } from "react";

export function ButtonLike({ deal }) {
  let [likes, setLikes] = useState(0);

  function onClick() {
    setLikes(likes + 1);
    console.log(`Like=${likes}`);

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
