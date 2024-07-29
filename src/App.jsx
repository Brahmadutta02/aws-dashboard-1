import React, { useEffect } from 'react';
import {
  Routes,
  Route,
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

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/video-url" element={<Videos />} />
        <Route path="/channel-url" element={<Channels />} />
        <Route path="/dashboard/recommendation/trending-hashtags" element={<TrendingHashtag />} />
        <Route path="/dashboard/recommendation/content-suggestions" element={<ContentSuggestion />} />
        <Route path="/dashboard/recommendation/meta-data-suggestions" element={<MetadataSuggestion />} />
        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/notifications" element={<Notifications />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
