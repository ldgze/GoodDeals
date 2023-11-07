import "../asset/style/AppNavBar.css";

export function AppNavBar() {
  return (
    <nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Grocery</a></li>
        <li><a href="#">Beauty</a></li>
        <li><a href="#">Fashion</a></li>
        <li><a href="#">Electronics</a></li>
        <li>
            <div class="search-box">
            <input type="search"
              placeholder="Search"/>
                    <button class="search-button">Search</button>
                </div>
            </li>
    </ul>
</nav>
  );
}
