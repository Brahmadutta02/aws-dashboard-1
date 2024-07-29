import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Videos from './pages/video/Videos';
import Channels from './pages/channel/Channels';
import TrendingHashtag from './pages/recommendation/TrendingHashtag';
import ContentSuggestion from './pages/recommendation/ContentSuggestion';
import MetadataSuggestion from './pages/recommendation/MetadataSuggestion';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import PageNotFound from './pages/utility/PageNotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isLoggedIn);

    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dashboard/analytics" element={<PrivateRoute element={<Analytics />} />} />
        <Route path="/video-url" element={<PrivateRoute element={<Videos />} />} />
        <Route path="/channel-url" element={<PrivateRoute element={<Channels />} />} />
        <Route path="/dashboard/recommendation/trending-hashtags" element={<PrivateRoute element={<TrendingHashtag />} />} />
        <Route path="/dashboard/recommendation/content-suggestions" element={<PrivateRoute element={<ContentSuggestion />} />} />
        <Route path="/dashboard/recommendation/meta-data-suggestions" element={<PrivateRoute element={<MetadataSuggestion />} />} />
        <Route path="/settings/account" element={<PrivateRoute element={<Account />} />} />
        <Route path="/settings/notifications" element={<PrivateRoute element={<Notifications />} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
