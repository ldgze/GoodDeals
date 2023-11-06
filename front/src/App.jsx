import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateDeal } from "./pages/CreateDeal";
import { DealDetail } from './pages/DealDetail';
import { EditDeal } from './pages/EditDeal';

import './App.css';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createdeal" element={<CreateDeal />} />
      <Route path={`/api/deals/id/:dealId`} element={<DealDetail />} />
      <Route path={`/api/deals/edit/:dealId`} element={<EditDeal />} />
    </Routes>
  );
}