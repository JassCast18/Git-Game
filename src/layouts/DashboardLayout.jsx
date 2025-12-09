import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
