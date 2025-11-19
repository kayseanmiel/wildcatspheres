import { useNavigate } from 'react-router-dom';
import jaguarImg from '../assets/jaguar.png';


export default function Landing() {
  const navigate = useNavigate();

  return (
  <div
  style={{
    position: "fixed", 
    top: 0,
    left: 0,
    height: "100vh", 
    width: "100vw",  
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #934B4B 0%, #6B2C2C 100%)", 
    display: "flex",
    flexDirection: "column",
    overflow: "hidden", 
  }}
>

      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'rgba(226, 180, 47, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'rgba(226, 180, 47, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }}></div>

      {/* Header/Navbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        zIndex: 100
      }}>
        {/* Logo - Top Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src={jaguarImg} 
            alt="Jaguar Logo" 
            style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
            }}
        />
            

          <h1 style={{
            color: '#E2B42F',
            fontSize: '28px',
            fontWeight: 'bold',
            fontStyle: 'italic',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '1px'
          }}>
            WILDCAT<span style={{ color: '#FFF' }}>SPHERES</span>
          </h1>
        </div>

        {/* Sign In Button - Top Right */}
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 35px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#4A1F1F',
            background: '#E2B42F',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* Main Content - Center */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        zIndex: 10
      }}>
        {/* Large Mascot */}
        <img
            src={jaguarImg}
            alt="Jaguar Mascot"
            style={{
                width: '300px',
                height: '300px',
                marginBottom: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                animation: 'bounce 2s infinite'
            }}
            />


        {/* Main Tagline - Highlighted */}
        <h2 style={{
          color: '#E2B42F',
          fontSize: '64px',
          fontWeight: 'bold',
          fontStyle: 'italic',
          margin: '0 0 30px 0',
          textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
          letterSpacing: '2px',
          lineHeight: '1.2',
          maxWidth: '900px',
          animation: 'fadeIn 1s ease-in'
        }}>
          Your Campus, Your Circle<br/>Wherever You Go
        </h2>

        {/* Description */}
        <p style={{
          color: '#FFF',
          fontSize: '22px',
          lineHeight: '1.6',
          margin: '0 0 60px 0',
          maxWidth: '700px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontWeight: '500'
        }}>
          Discover fun events, join hangouts, and make the Wildcat vibe yours on and off campus.
        </p>

        {/* Sign Up Section */}
        <div style={{
          padding: '25px 40px',
          background: 'rgba(107, 44, 44, 0.6)',
          borderRadius: '20px',
          border: '3px solid rgba(226, 180, 47, 0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
        }}>
          <p style={{
            color: '#FFF',
            fontSize: '18px',
            margin: '0 0 15px 0',
            fontWeight: '500'
          }}>
            Don't have an account yet?
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '14px 50px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#E2B42F',
              background: 'transparent',
              border: '3px solid #E2B42F',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#E2B42F';
              e.target.style.color = '#4A1F1F';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#E2B42F';
              e.target.style.transform = 'scale(1)';
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* Add CSS animations and global background fix */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #934B4B;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }
      `}</style>
    </div>
  );
}
