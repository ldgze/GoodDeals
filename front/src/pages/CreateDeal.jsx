import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../asset/style/CreateDeal.css";

import {GetUser} from "../components/GetUser";

export function CreateDeal() {
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    weblink: "",
    imagelink: "",
    category: "",
    like: 0,
    userId: "",
  });

  const [error, setError] = useState(""); 

  const { user } = GetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("You need to be logged in to create a deal.");
      navigate("/login");
    } else {
      setDealData((prevData) => ({ ...prevData, userId: user.id }));
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/deals/deal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    });

    if (!response.ok) {
      console.error("Error:", response.statusText);
      const errorMsg = await response.text();
      setError("Deal creation failed: " + errorMsg);
      return;
    }

    const responseData = await response.json();
    alert("Deal Created!");
    console.log("Success:", responseData);
    const dealId = responseData.dealId;
    navigate(`/deals/id/${dealId}`);
  };


  //   if (response.ok) {
  //     const responseData = await response.json();
  //     alert("Deal Created!");
  //     console.log("Success:", responseData);
  //     const dealId = responseData.dealId;
  //     navigate(`/deals/id/${dealId}`);
  //   } else {
  //     console.error("Error:", response.statusText);
  //     response
  //       .json()
  //       .then((json) => console.log(json))
  //       .catch((e) => console.log("Error parsing JSON:", e));
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDealData({ ...dealData, [name]: value });
  };
  

  return (
    <>
    {user ? (
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1>Create Deal</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
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
                <option value="grocery">Grocery</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Deal
            </button>
          </form>
        </div>
      </div>
    </div>
    ) : (
      <div>Not logged in</div>
    )}
    {error && <div className="alert alert-danger">{error}</div>}
  </>
  );
}

CreateDeal.propTypes = {};
