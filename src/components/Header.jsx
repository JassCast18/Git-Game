import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Git Game Dashboard</h1>
        <nav className="header-nav">
          <span className="user-info">Welcome, Player!</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
