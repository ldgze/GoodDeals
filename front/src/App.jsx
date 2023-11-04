import { AppNavBar } from "./layout/AppNavBar";
import { AppFooter } from "./layout/AppFooter";
// import { ButtonVote } from "./components/ButtonVote";
// import { PhotosGallery } from "./components/PhotosGallery";
import { Post } from "./components/Post";
import { useState, useEffect } from "react";

import './App.css';

export default function App() {
  let [deals, setDeals] = useState([]);

  // Fetch deals from the back end
  async function fetchDeals() {
    console.log("Fetching deals...");
    const response = await fetch("/api/deals");
    const data = await response.json();
    console.log("Got Data!", data);

    setDeals(data.deals || []); // Default to an empty array if data.deals is undefined
  }

  useEffect(() => {
    fetchDeals();
  }, []); 

  console.log("Render App deals=", deals);

  return (
    <div>
      <AppNavBar />
      <h1>GoodDeals - Discover and Share Deals</h1>
      <Post />
      <AppFooter />
    </div>
  );
}


// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <main className="main-content">
//           <Switch>
//             <Route exact path="/" component={HomePage} />
//             <Route path="/deals/:id" component={DealPage} />
//             <Route path="/category/:categoryName" component={CategoryPage} />
//             <Route path="/user/profile" component={UserProfile} />
//             <Route component={NotFoundPage} />
//           </Switch>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };



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