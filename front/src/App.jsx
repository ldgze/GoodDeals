import { Routes, Route, Link } from "react-router-dom";
import { CreateDeal } from "./pages/CreateDeal";
import { DealDetail } from "./pages/DealDetail";
import { EditDeal } from "./pages/EditDeal";
import { HomePage } from "./pages/HomePage";
import { AppNavBar } from "./layout/AppNavBar";
import { AppFooter } from "./layout/AppFooter";
import { DisplayPage } from "./pages/DisplayPage";
import { LoginPage } from "./pages/LoginPage";

import "./asset/style/App.css";

export default function App() {
  return (
    <div>
      
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="page-heading">GoodDeals</h1>
            <p className="lead">
              The best place to discover and share deals online!
            </p>
          </div>
          <div className="col-md-4 text-center">
        <Link to="/createdeal" className="btn btn-primary btn-lg">
          Create a Deal
        </Link>
          </div>
        </div>
      </div>

      <AppNavBar />

      <Routes>
        <Route path="/" element={<HomePage category="/" />} />
        <Route path="/createdeal" element={<CreateDeal />} />
        <Route path={`/deals/id/:dealId`} element={<DealDetail />} />
        <Route path={`/deals/edit/id/:dealId`} element={<EditDeal />} />
        <Route
          path="/category/beauty"
          element={<DisplayPage category="/category/beauty" />}
        />
        <Route
          path="/category/grocery"
          element={<DisplayPage category="/category/grocery" />}
        />
        <Route
          path="/category/fashion"
          element={<DisplayPage category="/category/fashion" />}
        />
        <Route
          path="/category/electronics"
          element={<DisplayPage category="/category/electronics" />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <AppFooter />
    </div>
  );
}
