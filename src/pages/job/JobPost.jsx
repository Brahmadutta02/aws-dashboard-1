import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function JobPost() {

  

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [activeTab, setActiveTab] = useState(0); 

  const [selectedButton, setSelectedButton] = useState('Title');

  const [placeholderText, setPlaceholderText] = useState("");

  // const handleChange = (e) => {
  //   setPlaceholderText(e.target.value);
  // }

  const clearTextarea = () => {
    setPlaceholderText(""); // Clear the content of the textarea by updating the state
  };



  const DeviceSizeCheck  = () => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
    
    // Use these variables as needed
    console.log("isDesktopOrLaptop:", isDesktopOrLaptop);
    console.log("isBigScreen:", isBigScreen);
    console.log("isTabletOrMobile:", isTabletOrMobile);
    console.log("isPortrait:", isPortrait);
    console.log("isRetina:", isRetina);

    // You can return JSX elements here if needed
    return null;
  }

  const [submittedText, setSubmittedText] = useState(""); // State variable to hold the submitted text

  const handleSubmission = () => {
    // Submit input logic
    const inputField = document.querySelector('input[type="text"]');
    if (inputField) {
      const value = inputField.value;
      // Set the submitted text to the state variable
      setSubmittedText(value);
    }
  };

  const handleChange = (event) => {
    setPlaceholderText(event.target.value);
  };

  const handleSubmit = () => {
    setSubmittedText(placeholderText); // Update submittedText state with entered text
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
              <h1
                className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
                // style={{ position: "relative", left: "400px", bottom: "5px" }}
              >
                Content Suggestion ✨
              </h1>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
              {/* Content */}
              <div>                
              </div>
              <div
                className="w-full lg:w-xl"
                style={{ position: "relative", right: "20%" }}
              >
                {/* Empty box */}

                <div className="flex">
                  <div className="flex-1">
                    <h1
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#8f97a9",
                        position: "relative",
                        top: "30px",
                        left: "253px",
                      }}
                      
                    >
                      Prompt
                    </h1>
                    <textarea
                    value={placeholderText}
                    onChange={handleChange}
                    placeholder="Enter Placeholder Text"
                    className="w-full bg-white-700 hover:bg-indigo-100 text-black p-3 rounded-md"
                    style={{
                      width: "104%",
                      position: "relative",
                      left: "252px",
                      height: "100%",
                      top: "30px",
                    }}
                  />

                    
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mb-4b"
                    style={{
                      position: "relative",
                      left: "45%",
                      transform: "translateX(-50%)",
                      top: "243px",
                      width: "120px",
                      height: "40px",
                    }}
                    
                    onClick={clearTextarea}
                  >
                    Clear
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4b"
                    style={{
                      position: "relative",
                      left: "35%",
                      transform: "translateX(-70%)",
                      top: "284px",
                      width: "120px",
                      height: "40px",
                    }}
                    // onClick={() => {
                    //   // Submit input logic
                    //   const inputField =
                    //     document.querySelector('input[type="text"]');
                    //   if (inputField) {
                    //     const value = inputField.value;
                    //     // Submit value (you can implement your submit logic here)
                    //     console.log("Submitted:", value);
                    //   }
                    // }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                
                <br></br>
                

                <h1
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "#8f97a9",
                    position: "relative",
                    top: "30px",
                    left: "252px",
                  }}
                >
                  Response
                </h1>

                <div
                  className="bg-white dark:bg-slate-700 p-5 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 mx-auto"
                  style={{
                    width:'750px',
                    height:'376px',
                    position: "relative",
                    left: "146px",
                    top: "30px",
                    borderRadius: "5px",
                    border:'1px solid black',
                    // textAlign: "center"
                  }}
                ><p>{submittedText}</p>
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







