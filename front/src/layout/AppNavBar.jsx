import "../asset/style/AppNavBar.css";
import {Link} from "react-router-dom";

export function AppNavBar() {
  return (
    <div className="container-fluid">
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
      </ul>
    </nav>
    </div>
  );
}

AppNavBar.propTypes = {};
