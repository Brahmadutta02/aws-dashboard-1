import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function JobPost() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedButton, setSelectedButton] = useState('Title');
  const [placeholderText, setPlaceholderText] = useState('');
  const [submittedText, setSubmittedText] = useState([]);
  const [displayedText, setDisplayedText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apiResponse, setApiResponse] = useState(''); // New state for API response
  

  const clearTextarea = () => {
    setPlaceholderText(''); // Clear the content of the textarea by updating the state
  };

  const DeviceSizeCheck = () => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)',
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    // Use these variables as needed
    console.log('isDesktopOrLaptop:', isDesktopOrLaptop);
    console.log('isBigScreen:', isBigScreen);
    console.log('isTabletOrMobile:', isTabletOrMobile);
    console.log('isPortrait:', isPortrait);
    console.log('isRetina:', isRetina);

    // You can return JSX elements here if needed
    return null;
  };

  const handleChange = (event) => {
    setPlaceholderText(event.target.value);
  };

  const handleSubmit = () => {
    if (placeholderText.trim() === '') {
      alert('Type something in Prompt');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "no5LtyF1CI4peL4ifoD036r0F8ZWbq9s2IdPV80N");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "body": JSON.stringify({
        "type": "content_suggestion",
        "topic_name": placeholderText
      })
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://hqdc0hrdni.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
      .then((response) => response.json()) // Parse the response as JSON
      .then((result) => {
        const body = JSON.parse(result.body);
        const formattedResponse = Object.entries(body)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        setSubmittedText(formattedResponse.split('\n')); // Update submittedText state with formatted response as an array
        setDisplayedText([]); // Reset displayed text
        setCurrentIndex(0); // Reset current index
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (currentIndex < submittedText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, submittedText[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 300); // Adjust the interval as needed
      return () => clearTimeout(timer);
    }
  }, [currentIndex, submittedText]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Page content */}
            <div className="mb-4 sm:mb-0 flex justify-center">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Content Suggestion ✨
              </h1>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
              {/* Content */}
              <div></div>
              <div
                className="w-full lg:w-xl"
                style={{ position: 'relative', right: '20%' }}
              >
                {/* Empty box */}

                <div className="flex">
                  <div className="flex-1 ">
                    <h1
                      style={{
                        fontSize: '0.9rem', // Adjusted for responsiveness
                        fontWeight: 'bold',
                        color: '#7e8aa7',
                        position: 'relative',
                        top: '1.5rem', // Adjusted for responsiveness
                        right: '4.1rem', // Adjusted for responsiveness
                        textAlign: 'center', // Center align text for responsiveness
                      }}
                    >
                      Topic Name
                    </h1>
                    <textarea
                      value={placeholderText}
                      onChange={handleChange}
                      placeholder="Enter Placeholder Text"
                      className="w-full bg-white-700 hover:bg-indigo-100 text-black p-3 rounded-md"
                      style={{
                        width: '100%', // Responsive width
                        position: 'relative',
                        left: '15.75rem', // Adjusted for responsiveness
                        top: '1.875rem', // Adjusted for responsiveness
                        height: '10rem', // Adjusted for responsiveness
                        overflow: 'auto', // Add this line for scrollbar
                      }}
                    />
                  </div>

                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mb-4"
                      style={{
                        position: 'relative',
                        left: '150%',
                        top: '137%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '40px',
                      }}
                      onClick={clearTextarea}
                    >
                      Clear
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4"
                      style={{
                        position: 'relative',
                        top: '160%',
                        left: '50%',
                        transform: 'translateX(50%)',
                        width: '120px',
                        height: '40px',
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <br></br>

                <div className="container">
                  <h1
                    style={{
                      fontSize: '0.9rem', // Adjust font size as needed
                      fontWeight: 'bold',
                      color: '#7e8aa7',
                      position: 'relative',
                      right: '11.9rem',
                      top: '0.5rem',
                      textAlign: 'center', // Center align for responsiveness
                      marginBottom: '1rem', // Add space below the heading
                    }}
                  >
                    Response
                  </h1>

                  <div
                    className="response-box"
                    style={{
                      backgroundColor: '#ffffff', // Background color
                      color: 'black',
                      padding: '1rem', // Padding for content
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow effect
                      borderRadius: '5px', // Rounded corners
                      border: '1px solid #000000', // Black border
                      maxWidth: '75.3%', // Maximum width for responsiveness
                      margin: '0 auto', // Center align horizontally
                      boxSizing: 'border-box', // Include padding in width
                      position: 'relative',
                      left: '8.3rem',
                      height: '25rem', // Fixed height for the box
                      overflow: 'auto', // Scrollbar when content exceeds height
                    }}
                  >
                    <ol>
                      {displayedText.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <DeviceSizeCheck />
    </div>
  );
}

export default JobPost;
