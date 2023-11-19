import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../asset/style/DisplayPage.css";

export function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/deals`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.deals);
        } else {
          console.error("Failed to fetch data from the backend");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    fetchPosts();
  }, []);

  const sortedPosts = posts.sort((a, b) => b.like - a.like);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="display-page">
        <h2>Deals</h2>
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
                  <p>Likes: {post.like}</p>
                  <p className="post-content">{post.description}</p>
                  <div className="post-meta">
                    <p className="post-category">Category: {post.category}</p>
                  </div>
                  <Link
                    to={`/deals/id/${post._id}`}
                    className="btn btn-primary btn-lg"
                  >
                    detail page
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

HomePage.propTypes = {};
