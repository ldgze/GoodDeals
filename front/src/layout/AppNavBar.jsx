import "../asset/style/AppNavBar.css";

export function AppNavBar() {
  return (
    <nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/category/grocery">Grocery</a></li>
        <li><a href="/category/beauty">Beauty</a></li>
        <li><a href="/category/fashion">Fashion</a></li>
        <li><a href="/category/electronics">Electronics</a></li>
        {/* <li>
            <div className="search-box">
            <input type="search"
              placeholder="Search"/>
                    <button className="search-button">Search</button>
                </div>
            </li> */}
    </ul>
</nav>
  );
}

AppNavBar.propTypes = {};
