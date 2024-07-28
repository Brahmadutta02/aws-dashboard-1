import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ReactMarkdown from 'react-markdown';

function MetadataSuggestion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [renderingComplete, setRenderingComplete] = useState(false); 

  const [selectedButton, setSelectedButton] = useState('Title');

  const clearTextarea = () => {
    setPlaceholderText("");
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
    setRenderingComplete(false); 
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
        // console.log(result);
        const formattedSuggestion = responseBody.suggestion.replace(/\\n/g, '\n');
        setSubmittedText(formattedSuggestion);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    setSubmittedText("");
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (currentIndex < submittedText.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
  
      return () => clearInterval(interval);
    } else {
      setRenderingComplete(true);
    }
  }, [currentIndex, submittedText]);

  const DeviceSizeCheck = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    return null;
  };

  const markdownComponents = {
    p: ({ node, ...props }) => (
      <p {...props} style={{ marginBottom: '10px', lineHeight: '1.5' }} />
    ),
    ul: ({ node, ...props }) => (
      <ul {...props} style={{ paddingLeft: '20px', marginBottom: '10px' }} />
    ),
    ol: ({ node, ...props }) => (
      <ol {...props} style={{ paddingLeft: '20px', marginBottom: '10px', listStyleType: 'decimal' }} />
    ),
    li: ({ node, ...props }) => (
      <li {...props} style={{ marginBottom: '5px' }} />
    ),
    h3: ({ node, ...props }) => (
      <h3 {...props} style={{ marginBottom: '10px', lineHeight: '1.5' }} />
    ),
    h2: ({ node, ...props }) => (
      <h2 {...props} style={{ marginBottom: '10px', lineHeight: '1.5' }} />
    ),
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="mb-4 sm:mb-0 flex justify-center">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Metadata Suggestion ✨
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
                    <h1 className='text-slate-800 dark:text-slate-100'
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
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
                      className="w-full bg-slate-700 dark:bg-slate-100 text-slate-100 dark:text-slate-800 p-3 rounded-md placeholder-white dark:placeholder-black"
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

                <h1 className='text-slate-800 dark:text-slate-100'
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    position: "relative",
                    top: "30px",
                    left: "252px",
                  }}
                >
                  Response
                </h1>

                <div
                  className="mt-4 p-4 bg-slate-700 dark:bg-slate-100 text-slate-100 dark:text-slate-800 rounded-lg"
                  style={{
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
                    overflowY: "auto", 
                    overflowX: "auto",
                    wordWrap: "break-word", 
                    wordBreak: "break-word",
                  }}
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <ReactMarkdown components={markdownComponents}>
                      {submittedText
                        .split(" ")
                        .slice(0, currentIndex)
                        .join(" ")}
                    </ReactMarkdown>
                  )}
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

export default MetadataSuggestion;
