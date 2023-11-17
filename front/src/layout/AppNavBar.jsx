import "../asset/style/AppNavBar.css";
import {Link} from "react-router-dom";

export function AppNavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/category/grocery">Grocery</a>
        </li>
        <li>
          <a href="/category/beauty">Beauty</a>
        </li>
        <li>
          <a href="/category/fashion">Fashion</a>
        </li>
        <li>
          <a href="/category/electronics">Electronics</a>
        </li>
        <li>
        <div class="search-box">
            <input type="search"
              placeholder="Search"/>
            <button class="search-button">Search</button>
        </div>
        </li>
        <div class="d-flex justify-content-end">
          <ul class="nav">
            <li class="nav">
              <Link to="/login" class="nav-link">Login</Link>
            </li>
          </ul>
      </div>
      </ul>
    </nav>
  );
}

AppNavBar.propTypes = {};
