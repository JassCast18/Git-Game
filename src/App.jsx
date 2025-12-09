import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Characters from './pages/Characters';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stats" element={<Stats />} />
          <Route path="characters" element={<Characters />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
