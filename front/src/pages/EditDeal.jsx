import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditDeal() {
  const [dealData, setDeal] = useState({
    title: '',
    description: '',
    weblink: '',
    imagelink: '',
    category: '',
    comments: [],
    like: 0,
  });
  const { dealId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeal() {
      try {
        const response = await fetch(`/api/deals/id/${dealId}`);
        if (response.ok) {
          const data = await response.json();
          setDeal(data);
        } else {
          console.error("Error fetching deal details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } 

    fetchDeal();
  }, [dealId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal(prevDealData => ({
      ...prevDealData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/deals/id/${dealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {title: dealData.title,
          description: dealData.description,
          weblink: dealData.weblink,
          imagelink: dealData.imagelink}),
      });
      
      console.log(dealData)

      if (response.ok) {
        alert('Deal updated successfully!');
        navigate(`/api/deals/id/${dealId}`); 
      } else {
        console.error("Error updating deal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Edit Deal</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <div className="form-group mb-3" >
              <input
                type="text"
                name="title"
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
                <option value="grocery">Grocery</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Update Deal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

