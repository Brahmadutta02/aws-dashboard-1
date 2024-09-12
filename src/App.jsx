import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

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

  React.useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <div className="App">
            <header className='App-header'>
              {/* Sign Out Button */}
              <button 
                onClick={signOut} 
                style={{ 
                  margin: '20px', 
                  fontSize: '0.8rem', 
                  padding: '5px 10px', 
                  marginTop: '20px'
                }}
              >
                Sign Out
              </button>
            </header>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signin" element={<Navigate to="/dashboard" replace />} /> {/* Redirect signed-in users */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/video-url" element={<Videos />} />
            <Route path="/channel-url" element={<Channels />} />
            <Route path="/dashboard/recommendation/trending-hashtags" element={<TrendingHashtag />} />
            <Route path="/dashboard/recommendation/content-suggestions" element={<ContentSuggestion />} />
            <Route path="/dashboard/recommendation/meta-data-suggestions" element={<MetadataSuggestion />} />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </Authenticator>
  );
}

export default App;
