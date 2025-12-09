import './SamplePage.css';

function Stats() {
  return (
    <div className="sample-page">
      <h2 className="page-title">Your Stats</h2>
      <p className="page-subtitle">View your detailed statistics and progress</p>
      
      <div className="content-section">
        <h3>Git Activity</h3>
        <p>This section will display your Git activity statistics including commits, pull requests, and more.</p>
        <div className="placeholder-chart">
          <span>📊 Chart Placeholder</span>
        </div>
      </div>

      <div className="content-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div>
              <p className="activity-title">First login</p>
              <p className="activity-time">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
