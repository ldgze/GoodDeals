import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateDeal } from "./pages/CreateDeal";
import { DealDetail } from './pages/DealDetail';

import './App.css';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createdeal" element={<CreateDeal />} />
      <Route path="/deals/:dealId" element={<DealDetail />} />
    </Routes>
  );
}