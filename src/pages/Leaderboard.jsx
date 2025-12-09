import './SamplePage.css';

function Leaderboard() {
  return (
    <div className="sample-page">
      <h2 className="page-title">Leaderboard</h2>
      <p className="page-subtitle">See how you rank against other players</p>
      
      <div className="content-section">
        <h3>Global Rankings</h3>
        <p>Compete with players worldwide and climb the leaderboard!</p>
        <div className="placeholder-chart">
          <span>🏆 Leaderboard Coming Soon</span>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
