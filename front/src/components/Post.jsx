import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';


export function Post ({ title, content, author, date, category}) {
       return (
      <div className="post">
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>
        <div className="post-meta">
          <p className="post-author">Author: {author}</p>
          <p className="post-date">Date: {date}</p>
          <p className="post-category">Category: {category}</p>
        </div>
      </div>
    );
  };