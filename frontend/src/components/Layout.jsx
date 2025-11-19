import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // We check if the current path STARTS with the link path to keep it active
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Fixed: Changed 'access_token' to 'token'
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#934B4B'
    }}>
      {/* SIDEBAR - LEFT SIDE */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '250px',
        background: '#934B4B',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        zIndex: 1000,
        boxShadow: '4px 0 10px rgba(0,0,0,0.3)'
      }}>
        {/* Logo/Mascot */}
        <div style={{ 
          marginBottom: '40px', 
          textAlign: 'center',
          borderBottom: '2px solid rgba(226, 180, 47, 0.3)',
          paddingBottom: '20px'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '15px' }}>🐆</div>
          <h2 style={{ 
            color: '#E2B42F', 
            fontSize: '24px', 
            fontWeight: 'bold',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            WILDCAT<br/>SPHERES
          </h2>
          <p style={{
            color: '#FFF',
            fontSize: '12px',
            margin: '10px 0 0 0',
            fontStyle: 'italic'
          }}>
            Your Campus, Your Circle
          </p>
        </div>
        
        {/* Navigation Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1
        }}>
          {/* ✅ FIXED LINK: Points to /home */}
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '15px 20px',
              background: isActive('/home') ? '#E2B42F' : 'rgba(107, 44, 44, 0.6)',
              color: isActive('/home') ? '#4A1F1F' : '#FFF',
              border: isActive('/home') ? 'none' : '2px solid rgba(226, 180, 47, 0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: isActive('/home') ? '0 4px 8px rgba(0,0,0,0.3)' : 'none'
            }}>
              <span style={{ fontSize: '20px' }}>🏠</span>
              <span>HOME</span>
            </button>
          </Link>
          
          {/* ✅ FIXED LINK: Points to /home/wildcats */}
          <Link to="/home/wildcats" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '15px 20px',
              background: isActive('/home/wildcats') ? '#E2B42F' : 'rgba(107, 44, 44, 0.6)',
              color: isActive('/home/wildcats') ? '#4A1F1F' : '#FFF',
              border: isActive('/home/wildcats') ? 'none' : '2px solid rgba(226, 180, 47, 0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: isActive('/home/wildcats') ? '0 4px 8px rgba(0,0,0,0.3)' : 'none'
            }}>
              <span style={{ fontSize: '20px' }}>🐾</span>
              <span>WILDCATS</span>
            </button>
          </Link>
          
          {/* ✅ FIXED LINK: Points to /home/events */}
          <Link to="/home/events" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '15px 20px',
              background: isActive('/home/events') ? '#E2B42F' : 'rgba(107, 44, 44, 0.6)',
              color: isActive('/home/events') ? '#4A1F1F' : '#FFF',
              border: isActive('/home/events') ? 'none' : '2px solid rgba(226, 180, 47, 0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: isActive('/home/events') ? '0 4px 8px rgba(0,0,0,0.3)' : 'none'
            }}>
              <span style={{ fontSize: '20px' }}>🎟️</span>
              <span>EVENTS</span>
            </button>
          </Link>
          
          {/* Show Host Event button only on Events page */}
          {isActive('/home/events') && (
            <>
              <div style={{ 
                margin: '15px 0', 
                borderTop: '2px solid rgba(226, 180, 47, 0.5)' 
              }}></div>
              {/* ✅ FIXED LINK: Points to /home/host-event */}
              <button 
                onClick={() => navigate('/home/host-event')}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: '#E2B42F',
                  color: '#4A1F1F',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '28px' }}>+</span>
                <span>HOST AN<br/>EVENT</span>
              </button>
            </>
          )}
        </div>
        
        {/* Logout Button */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#E2B42F',
              border: '2px solid #E2B42F',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#E2B42F';
              e.target.style.color = '#4A1F1F';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#E2B42F';
            }}
          >
            <span>🚪</span>
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
      
      {/* MAIN CONTENT AREA */}
      <div style={{ 
        marginLeft: '250px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#934B4B'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 50px',
          background: 'rgba(107, 44, 44, 0.8)',
          borderBottom: '4px solid #E2B42F',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{ 
            color: '#E2B42F', 
            fontSize: '32px', 
            fontWeight: 'bold',
            fontStyle: 'italic',
            margin: 0,
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            WILDCAT<span style={{ color: '#FFF' }}>SPHERES</span>
          </h1>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="🔍 SEARCH"
              style={{
                padding: '10px 25px',
                borderRadius: '25px',
                border: '3px solid #E2B42F',
                background: 'rgba(255, 255, 255, 0.95)',
                width: '280px',
                fontSize: '15px',
                fontWeight: '500'
              }}
            />
            <div style={{ 
              fontSize: '26px', 
              cursor: 'pointer',
              color: '#E2B42F',
              transition: 'transform 0.2s'
            }}>🔔</div>
            <div style={{ 
              fontSize: '26px', 
              cursor: 'pointer',
              color: '#E2B42F',
              background: 'rgba(226, 180, 47, 0.2)',
              padding: '8px',
              borderRadius: '50%',
              border: '2px solid #E2B42F'
            }}>👤</div>
          </div>
        </div>
        
        {/* Page Content */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          background: '#934B4B'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}