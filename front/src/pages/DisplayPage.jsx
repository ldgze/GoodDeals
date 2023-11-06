import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    // Fetch or load your posts data from an API or a source
    // For demonstration purposes, let's assume you have an array of posts
    // const postsData = [
    //   { id: 1, title: 'Post 1', ranking: 5 },
    //   { id: 2, title: 'Post 2', ranking: 8 },
    //   { id: 3, title: 'Post 2', ranking: 8 },
    //   { id: 4, title: 'Post 2', ranking: 6 },
    //   { id: 5, title: 'Post 2', ranking: 7 },
    //   { id: 6, title: 'Post 2', ranking: 82 },
    //   { id: 7, title: 'Post 2', ranking: 85 },
    //   { id: 8, title: 'Post 2', ranking: 3 },
    //   { id: 9, title: 'Post 2', ranking: 58 },
    //   { id: 10, title: 'Post 2', ranking: 5 },
    //   { id: 11, title: 'Post 2', ranking:43 },
    //   { id: 12, title: 'Post 2', ranking: 2 },
    //   { id: 13, title: 'Post 2', ranking: 5 },
    //   { id: 14, title: 'Post 2', ranking: 1 },
    //   { id: 15, title: 'Post 2', ranking:3 },
    //   { id: 16, title: 'Post 2', ranking: 5 },
    //   { id: 17, title: 'Post 2', ranking: 6 },
    //   { id: 18, title: 'Post 2', ranking: 7 },
    //   // Add more posts here
    // ];
    // setPosts(postsData);
  }, []);

  // Sort the fetched posts by ranking in descending order
  const sortedPosts = posts.sort((a, b) => b.ranking - a.ranking);

  // Calculate the indexes for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Posts</h2>
      {currentPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>Ranking: {post.ranking}</p>
          <p className="post-content">{post.description}</p>
        <div className="post-meta">
          <p className="post-category">Category: {post.category}</p>
        </div>
        <Link to={`/api/deals/id/${post._id}`} className="btn btn-primary btn-lg">
              detail page
            </Link>
        </div>
      ))}

      <div>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};


