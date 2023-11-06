import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../asset/style/CreateDeal.css';

export function CreateDeal () {
  const [dealData, setDealData] = useState({
    title: '',
    description: '',
    weblink: '',
    imagelink: '',
    category: '',
    comments: [],
    like: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/deals/deal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealData),
    });

    if (response.ok) {
      const responseData = await response.json();
      alert('Deal Created!');
      console.log("Success:", responseData);
      const dealId = responseData.dealId;
      console.log(dealId)
      navigate(`/api/deals/${dealId}`);

    } else {
      console.error("Error:", response.statusText);
      response.json().then(json => console.log(json)).catch(e => console.log('Error parsing JSON:', e));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDealData({ ...dealData, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create Deal</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <div className="form-group mb-3" >
              <input
                type="text"
                name="title"
                placeholder="Deal Title"
                value={dealData.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                placeholder="Deal Description"
                value={dealData.description}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3" >
              <label htmlFor="weblink">Deal Link</label>
              <input
                type="text"
                name="weblink"
                placeholder="Deal Link"
                value={dealData.weblink}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="imagelink">Image Link</label>
              <input
                type="text"
                name="imagelink"
                placeholder="Image Link"
                value={dealData.imagelink}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={dealData.category}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">Select Category</option>
                <option value="groceries">Groceries</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit Deal</button>
          </form>
        </div>
      </div>
    </div>
  );
};