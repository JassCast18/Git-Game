import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/stats', label: 'Stats', icon: '📈' },
    { path: '/characters', label: 'Characters', icon: '🎮' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
