const Sidebar = () => {
  const handlePlaceholderClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    alert(`A página "${page}" é apenas visual. Funcionalidade completa: Notas ✅`);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" width="48" height="48" />
      </div>

      <div className="menu-section">
        <span className="menu-label">MENU PRINCIPAL</span>
        <nav className="nav">
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Home')}>
            <img src="/home.svg" alt="" className="nav-icon" />
            <span>Home</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Análises')}>
            <img src="/analytics.svg" alt="" className="nav-icon" />
            <span>Análises</span>
          </a>
          <a href="#" className="nav-item active">
            <img src="/notes.svg" alt="" className="nav-icon" />
            <span>Notas</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Histórico')}>
            <img src="/history.svg" alt="" className="nav-icon" />
            <span>Histórico</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Mapa')}>
            <img src="/map.svg" alt="" className="nav-icon" />
            <span>Mapa</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Dashboard')}>
            <img src="/dashboard.svg" alt="" className="nav-icon" />
            <span>Dashboard</span>
          </a>
        </nav>
      </div>

      <div className="menu-section">
        <span className="menu-label">OPÇÕES</span>
        <nav className="nav">
          <a href="#" className="nav-item" onClick={(e) => handlePlaceholderClick(e, 'Logs')}>
            <img src="/logs.svg" alt="" className="nav-icon" />
            <span>Logs</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-footer">
        <small>© 2024 Enterprisejseum | v1.0.0</small>
      </div>
    </div>
  );
};

export default Sidebar;