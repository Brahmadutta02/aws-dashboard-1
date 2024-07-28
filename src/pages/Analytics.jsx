import React, { useState, useEffect } from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { useMediaQuery } from 'react-responsive'

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function Analytics() {

  console.log("Running dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("");
  const [overflowX, setOverflowX] = useState('hidden');
  const [overflowY, setOverflowY] = useState('hidden');


  useEffect(() => {

    async function fetchTokenAndEmbedDashboard() {
      try {
        // Fetch the token from the backend
        const loginPayload = {
          password: "password123",
          provider: "db",
          refresh: true,
          username: "admin"
        };

        const loginResponse = await fetch(
          "https://2k9vatq8w5.execute-api.us-east-1.amazonaws.com/api/v1/security/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginPayload)
          }
        );

        const { access_token } = await loginResponse.json();
        console.log("access_token", access_token);


        // Fetch the guest token
        const guestTokenPayload = {
          user: {
            username: "admin",
            first_name: "admin",
            last_name: "admin"
          },
          resources: [
            {
              type: "dashboard",
              id: "c6732045-d2ce-4246-a10c-097fdf4c1a56"
            }
          ],
          rls: []
        };

        const guestTokenResponse = await fetch("https://2k9vatq8w5.execute-api.us-east-1.amazonaws.com/api/v1/security/guest_token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(guestTokenPayload)
          }
        );

        const { token } = await guestTokenResponse.json();
        console.log("token", token);

        // Set the dashboard URL with the token
        console.log("Setting dashboard URL");
        // setDashboardUrl(
        //   `https://bunny-discrete-strictly.ngrok-free.app/superset/dashboard/1/?token=${token}`
        // );

        embedDashboard({
          id: "c6732045-d2ce-4246-a10c-097fdf4c1a56", // Dashboard ID
          supersetDomain: "https://2k9vatq8w5.execute-api.us-east-1.amazonaws.com/", // Superset instance URL
          mountPoint: document.getElementById("superset-container"), // Mount point
          fetchGuestToken: () => Promise.resolve(token), // Function to fetch token
          dashboardUiConfig: { hideTitle: true }, // UI config
        });

        //console.log(`https://bunny-discrete-strictly.ngrok-free.app/superset/dashboard/1/?token=${token}`)
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    // Call fetchTokenAndEmbedDashboard when the component mounts
    fetchTokenAndEmbedDashboard();
  
  let intervalId; // Declare intervalId outside MutationObserver callback
  const observer = new MutationObserver(() => {
    const iframe = document.getElementById("superset-container").querySelector('iframe');
    if (iframe && !intervalId) {
      // If the iframe exists and no interval is set, adjust iframe directly & set up an interval
      adjustIframeSize(iframe); // Initial adjustment
      // Continuously adjust iframe size
      intervalId = setInterval(() => {
        adjustIframeSize(iframe);
      }, 1000); // Adjust as needed
    }
  });
  // Start observing changes in the superset-container
  observer.observe(document.getElementById("superset-container"), {
    childList: true,
  })
  // Function to adjust iframe size based on viewport width
  function adjustIframeSize(iframe) {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const newWidth = viewportWidth * 5; // Adjust multiplier as needed
    iframe.style.width = '600%'; // Set width to 100% of parent container
    iframe.style.height = '100%';
  }
  // Cleanup function to clear interval and disconnect observer
  return () => {
    if (intervalId) clearInterval(intervalId);
    observer.disconnect();
  };
  }, []);
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow" style={{ overflowY: 'auto' }}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Analytics ✨</h1>
      <div id="superset-container" style={{ width: '13vw', height: '80vh', }} >
        {/* Superset dashboard will be embedded her */}
      </div>
              </div>
          
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                
              
                  
              </div>
              
            
            </div>            
            
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Analytics;