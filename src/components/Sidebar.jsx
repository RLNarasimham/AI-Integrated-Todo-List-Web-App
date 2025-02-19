import { FaHome, FaPowerOff } from 'react-icons/fa';
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
  <div
  className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#2c3e50',
    color: '#fff',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    width: isCollapsed ? '60px' : '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isCollapsed ? 'center' : 'flex-start',
    padding: '10px',
  }}
  >
  <button
    onClick={toggleSidebar}
    style={{
      marginBottom: '20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      cursor: 'pointer',
      alignItems: 'left',
    }}
  >
    {isCollapsed ? <FaBars /> : '←'}
  </button>
  <div
    className={`profile ${isCollapsed ? 'hidden' : ''}`}
    style={{
      marginBottom: '20px',
      textAlign: 'center',
    }}
  >
  <img
    src="profile.jpg"
    alt="Profile"
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginBottom: '5px',
    }}
  />
  <h3
    style={{
      fontSize: '18px',
      margin: 0,
    }}
  >
    R L Narasimham
  </h3>
</div>
<nav>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li style={{ marginBottom: '10px' }}>
      <a href="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaHome />
        {!isCollapsed && <span>Home</span>}
      </a>
    </li>
    <li style={{ marginBottom: '10px' }}>
      <a href="/home" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaPowerOff />
        {!isCollapsed && <span>Logout</span>}
      </a>
    </li>
  </ul>
</nav>
</div>
  );
};

export default Sidebar;