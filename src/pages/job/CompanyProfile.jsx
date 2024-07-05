import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobListItem from '../../partials/job/JobListItem';

import CompanyBg from '../../images/company-bg.jpg';
import CompanyImage from '../../images/company-icon-01.svg';

function CompanyProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // New state for loading effect

  const [selectedButton, setSelectedButton] = useState('Title'); // Adjusted for single string

  const clearTextarea = () => {
    setPlaceholderText(""); // Clear the content of the textarea by updating the state
  };

  const handleChange = (event) => {
    setPlaceholderText(event.target.value); // Update the state with textarea content
  };

  const handleSubmit = () => {
    if (placeholderText.trim() === '') {
      alert('Type something in Topic Name');
      return;
    }
  
    setLoading(true); // Show loading effect
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "no5LtyF1CI4peL4ifoD036r0F8ZWbq9s2IdPV80N");
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "body": "{\"type\": \"metadata_suggestion\", \"content_idea\": \"" + placeholderText + "\",\"detail_type\": \"" + selectedButton + "\"}"
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://hqdc0hrdni.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        const responseBody = JSON.parse(parsedResult.body);
        console.log(result);
        setSubmittedText(responseBody.suggestion);
        setCurrentIndex(0);
        setLoading(false); // Hide loading effect
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Hide loading effect on error
      });
  };
  
  // Handle button click to change selected button
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    // Clear response box and reset currentIndex when switching button
    setSubmittedText("");
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (currentIndex < submittedText.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100); // Adjust the speed by changing the interval duration
  
      return () => clearInterval(interval);
    }
  }, [currentIndex, submittedText]);

  const DeviceSizeCheck = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    // Use these variables as needed
    // console.log("isDesktopOrLaptop:", isDesktopOrLaptop);
    // console.log("isBigScreen:", isBigScreen);
    // console.log("isTabletOrMobile:", isTabletOrMobile);
    // console.log("isPortrait:", isPortrait);
    // console.log("isRetina:", isRetina);

    return null;
  };

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
                Meta Data Suggestion ✨
              </h1>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
              {/* Content */}
              <div></div>
              <div
                className="w-full lg:w-xl"
                style={{ position: "relative", right: "20%" }}
              >
                {/* Empty box */}
                <div className="flex">
                  <div className="flex-1">
                    <h1
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: "#7e8aa7",
                        position: "relative",
                        top: "1.5rem",
                        right: "4.1rem",
                        textAlign: "center",
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
                        width: "100%",
                        position: "relative",
                        left: "15.75rem",
                        top: "1.875rem",
                        height: "10rem",
                        overflow: "auto",
                      }}
                    />
                  </div>

                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mb-4"
                      style={{
                        position: "relative",
                        left: "150%",
                        top: "137%",
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "40px",
                      }}
                      onClick={clearTextarea}
                    >
                      Clear
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4"
                      style={{
                        position: "relative",
                        top: "160%",
                        left: "50%",
                        transform: "translateX(50%)",
                        width: "120px",
                        height: "40px",
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <br></br>

                <h1
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#7e8aa7",
                    position: "relative",
                    top: "30px",
                    left: "252px",
                  }}
                >
                  Response
                </h1>

                <div
                  className="mt-4 p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg"
                  style={{
                    backgroundColor: "#ffffff",
                    fontWeight: "bold",
                    color: "black",
                    padding: "1rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    border: "1px solid #000000",
                    maxWidth: "75.3%",
                    margin: "0 auto",
                    boxSizing: "border-box",
                    position: "relative",
                    left: "8.3rem",
                    top: "2rem",
                    height: "25rem",
                    overflow: "auto",
                  }}
                >
                  {loading
                    ? "Loading..."
                    : submittedText.split(" ").slice(0, currentIndex).join(" ")}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                    left: "70px",
                    bottom: "390px",
                  }}
                >
                  <button
                    className={`bg-${
                      selectedButton === "Title" ? "blue-500" : "slate-700"
                    } hover:bg-blue-500 text-white font-bold py-2 px-11 rounded-t-lg lg:rounded-tl-md`}
                    onClick={() => handleButtonClick("Title")}
                    style={{
                      width: "100%",
                      maxWidth: "130px",
                      borderRadius: "10px 10px 0 0",
                      border: "1px solid white",
                    }}
                  >
                    Title
                  </button>

                  <button
                    className={`bg-${
                      selectedButton === "Description"
                        ? "blue-500"
                        : "slate-700"
                    } hover:bg-blue-500 text-white font-bold py-2 px-5`}
                    onClick={() => handleButtonClick("Description")}
                    style={{
                      width: "100%",
                      maxWidth: "130px",
                      border: "1px solid white",
                    }}
                  >
                    Description
                  </button>

                  <button
                    className={`bg-${
                      selectedButton === "Hashtags" ? "blue-500" : "slate-700"
                    } hover:bg-blue-500 text-white font-bold py-2 px-3 lg:px-7 rounded-b-lg lg:rounded-bl-md`}
                    onClick={() => handleButtonClick("Hashtags")}
                    style={{
                      width: "100%",
                      maxWidth: "130px",
                      borderRadius: "0 0 10px 10px",
                      border: "1px solid white",
                    }}
                  >
                    Hashtags
                  </button>
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

export default CompanyProfile;
