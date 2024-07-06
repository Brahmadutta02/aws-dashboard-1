import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ReactMarkdown from 'react-markdown';

function JobPost() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [submittedText, setSubmittedText] = useState([]);
  const [displayedText, setDisplayedText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const clearTextarea = () => {
    setPlaceholderText('');
  };

  const DeviceSizeCheck = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    return null;
  };

  const handleChange = (event) => {
    setPlaceholderText(event.target.value);
  };

  const handleSubmit = () => {
    if (placeholderText.trim() === '') {
      alert('Type something in Topic Name');
      return;
    }
  
    setLoading(true);
  
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
      .then((response) => response.json())
      .then((result) => {
        const body = JSON.parse(result.body);
        const formattedResponse = Object.values(body)
          .map((value, index) => `${index + 1}. ${value}`)
          .join('\n');
        setSubmittedText(formattedResponse.split('\n'));
        setDisplayedText([]);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  

  useEffect(() => {
    if (currentIndex < submittedText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, submittedText[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, submittedText]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="mb-4 sm:mb-0 flex justify-center">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Content Suggestion ✨
              </h1>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
              <div></div>
              <div
                className="w-full lg:w-xl"
                style={{ position: "relative", right: "20%" }}
              >
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

                <br />

                <div className="container">
                  <h1
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "#7e8aa7",
                      position: "relative",
                      right: "11.9rem",
                      top: "0.5rem",
                      textAlign: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    Response
                  </h1>

                  <div
                    className="response-box"
                    style={{
                      backgroundColor: "#ffffff",
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
                      height: "25rem",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                    }}
                  >
                    {loading ? (
                      <div className="loading-dots">
                        Loading<span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </div>
                    ) : (
                      <div>
                        {displayedText.map((item, index) => (
                          <ReactMarkdown key={index}>{item}</ReactMarkdown>
                        ))}
                      </div>
                    )}
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
