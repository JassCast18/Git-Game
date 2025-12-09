import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard Overview</h2>
      <p className="page-subtitle">Track your Git stats and explore the game!</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Current Level</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Total XP</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-content">
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Achievements</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚔️</div>
          <div className="stat-content">
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Challenges Won</p>
          </div>
        </div>
      </div>

      <div className="welcome-section">
        <h3>Welcome to Git Game!</h3>
        <p>
          This is your personal dashboard where you can track your Git stats, 
          explore characters, challenge others, and see how you rank on the leaderboard.
        </p>
        <p>
          Start by exploring the different sections using the sidebar navigation.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
