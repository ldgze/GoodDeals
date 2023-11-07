import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../asset/style/DisplayPage.css';

export function DisplayPage  ()  {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts () {
        try {
          const response = await fetch('/api/deals'); // Replace with your actual API endpoint
          if (response.ok) {
            const data = await response.json();
            // Assuming the data is an array of posts
            setPosts(data.deals);
            console.log(data.deals[0]);
          } else {
            // Handle error if the request is not successful
            console.error('Failed to fetch data from the backend');
          }
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      };
  
      fetchPosts();
  }, []);

  // Sort the fetched posts by ranking in descending order
  const sortedPosts = posts.sort((a, b) => b.like - a.like);

  // Calculate the indexes for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="display-page">
      <h2>Posts</h2>
      {currentPosts.map((post) => (
        <div classname="container">
        
        <div className="post-card" key={post._id}>
        <div className="row justify-content-center">
            <div className="col-md-4">
            <img src={post.imagelink} alt={post.title} className="post-card-img"/>
            </div>
            <div className="col-md-8 text-center">
          <h3>{post.title}</h3>
          <p>Like: {post.like}</p>
          <p className="post-content">{post.description}</p>
        <div className="post-meta">
          <p className="post-category">Category: {post.category}</p>
        </div>
        <Link to={`/api/deals/id/${post._id}`} className="btn btn-primary btn-lg">
              detail page
            </Link>
        </div>
        </div>
        </div>
        </div>
      ))}

      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};


