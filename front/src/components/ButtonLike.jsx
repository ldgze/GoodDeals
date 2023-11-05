import PropTypes from "prop-types";
import { useState } from "react";

export function ButtonLike({ dealname }) {
  let [likes, setLikes] = useState(0);

  function onClick() {
    setLikes(likes + 1);
    console.log(`Like=${likes}`);
  }

  console.log("render ButtonLike", dealname, likes);
  return (
    <div>
      <button className="btn btn-primary mb-2" onClick={onClick}>
        Like for {dealname}
      </button>
      <output>
        {dealname} has {likes} likes
      </output>
    </div>
  );
}
ButtonVote.propTypes = {
  dealname: PropTypes.string.isRequired,
};
