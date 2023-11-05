import React from 'react';
import { Link } from 'react-router-dom';

import { AppNavBar } from "../layout/AppNavBar";
import { AppFooter } from "../layout/AppFooter";

import { Post } from "../components/Post";
import { useState, useEffect } from "react";

export function HomePage() {
  return (
      <div>
        <AppNavBar />
        <h1>GoodDeals - Discover and Share Deals</h1>
        <Link to="/createdeal">
        <button type="button">Create a Deal</button>
        </Link>
        <AppFooter />
      </div>
    );
  }

  // let [deals, setDeals] = useState([]);

  // async function fetchDeals() {
  //   console.log("Fetching deals...");
  //   const response = await fetch("/api/deals");
  //   const data = await response.json();
  //   console.log("Got Data!", data);

  //   setDeals(data.deals || []);
  // }

  // useEffect(() => {
  //   fetchDeals();
  // }, []); 

// function SearchBar() {
//   // const [query, setQuery] = useState("");
//   let query = "";

//   function onInput(evt) {
//     console.log("SearchBar onInput", evt.target.value);
//     // setQuery(evt.target.value);

//     query = evt.target.value;
//   }

//   return (
//     <div>
//       Search <input className="input-control" type="text" onInput={onInput} />
//     </div>
//   );
// }