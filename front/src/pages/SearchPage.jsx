import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export function SearchPage (){
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const searchTerm = query.get('query');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/deals`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.deals);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  const sortedPosts = posts.sort((a, b) => b.like - a.like);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
        <div>
          <div className="display-page">
            <h2>Search Results for: {searchTerm}</h2>
            {currentPosts.map((post, index) => (
              <div className="container-fluid" key={index}>
                <div className="post-card" key={post._id}>
                  <div className="row justify-content-center">
                    <div className="col-md-3">
                      <img
                        src={post.imagelink}
                        alt={post.title}
                        className="post-card-img"
                      />
                    </div>
                    <div className="col-md-9 text-center">
                      <h3>{post.title}</h3>
                      <p className="post-content">{post.description}</p>
                      <p className="fa fa-star likechecked"> Likes: {post.like}</p>
                      <div className="post-meta">
                        <p className="post-category">Category: {post.category}</p>
                      </div>
                      <Link
                        to={`/deals/id/${post._id}`}
                        className="btn btn-primary btn-lg"
                      >
                        Detail Page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
    
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="prev"
              >
                Previous Page
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                className="next"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      );
    }




//     <div>
//       <h2>Search Results for: {searchTerm}</h2>
//       {filteredPosts.length > 0 ? (
//         filteredPosts.map((post, index) => (
//           <div key={index}>
//             <h3>{post.title}</h3>
//             <p>{post.description}</p>
//             {/* Additional post details */}
//           </div>
//         ))
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// };

{/* <h2>Search Results for: {searchTerm}</h2> */}