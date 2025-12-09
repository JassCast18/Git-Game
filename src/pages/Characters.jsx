import './SamplePage.css';

function Characters() {
  return (
    <div className="sample-page">
      <h2 className="page-title">Characters</h2>
      <p className="page-subtitle">Explore and challenge other characters based on your level</p>
      
      <div className="content-section">
        <h3>Available Characters</h3>
        <p>Characters will be unlocked as you level up. Challenge them to earn XP and achievements!</p>
        <div className="placeholder-chart">
          <span>🎮 Characters Coming Soon</span>
        </div>
      </div>
    </div>
  );
}

export default Characters;
