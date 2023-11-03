import React, { useState } from 'react';

function PostDealForm({ onDealPosted }) {
  const [dealData, setDealData] = useState({
    title: '',
    link: '',
    category: '',
    // Other deal fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to post the new deal
    // onDealPosted should be a function to refresh the deals list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={dealData.title}
        onChange={(e) => setDealData({ ...dealData, title: e.target.value })}
        placeholder="Deal Title"
        required
      />
      <button type="submit">Post Deal</button>
    </form>
  );
}

export default PostDealForm;