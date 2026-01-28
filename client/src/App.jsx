import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Transactions from './pages/Transactions';
import SendMoney from './pages/SendMoney';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Banks from './pages/Banks';
import Help from './pages/Help';
import Cards from './pages/Cards';
import Products from './pages/Products';

function AppContent() {
  const location = useLocation();
  const portalRoutes = ['/dashboard', '/transactions', '/send', '/profile', '/wallet', '/banks', '/help', '/cards'];
  const showNavbar = !['/', '/about', '/products', ...portalRoutes].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/banks" element={<Banks />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cards" element={<Cards />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
