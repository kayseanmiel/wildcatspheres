import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Home from './pages/Home';
import Wildcats from './pages/Wildcats';
import Events from './pages/Events';
import HostEvent from './pages/HostEvent';

// 1. Define the PrivateRoute here
function PrivateRoute({ children }) {
  // We use "token" now (fixing the "access" bug)
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        {/* We wrap the Layout in PrivateRoute so ALL children are protected automatically */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="wildcats" element={<Wildcats />} />
          <Route path="events" element={<Events />} />
          <Route path="host-event" element={<HostEvent />} />
        </Route>

        {/* Catch-all for 404s (Optional, redirects to Landing) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;