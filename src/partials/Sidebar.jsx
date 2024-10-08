import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // setting sidebar extended by default as true
  localStorage.setItem("sidebar-expanded", true);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  

  // settings for submenu items show/hide
  const defaultHideSubmenuStatus = {
    dashboard : false,
    recommendation: false,
    settings: false,
  };

  const storedHideSubmenuStatus = localStorage.getItem("hide-sub-menu-status");
  const [hideSubmenuStatus, setHideSubmenuStatus] = useState(
    storedHideSubmenuStatus === null 
      ? defaultHideSubmenuStatus : JSON.parse(storedHideSubmenuStatus)
    );

  useEffect(() => {
    const storedHideSubmenuStatus = localStorage.getItem("hide-sub-menu-status");
    if(storedHideSubmenuStatus === null) {
      localStorage.setItem("hide-sub-menu-status", JSON.stringify(defaultHideSubmenuStatus));
    } 
  }, []);

  useEffect(()=>{
    if(hideSubmenuStatus){
      localStorage.setItem("hide-sub-menu-status", JSON.stringify(hideSubmenuStatus));
    }
  },[hideSubmenuStatus]);
  // end settings for submenu items show/hide

  return (
    <div className="min-w-fit" style={{ position: "relative", width: "0px" }}>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden=""
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/dashboard" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup>
                <React.Fragment>
                  <a
                    href="#0"
                    className={`block text-slate-200 truncate transition duration-150 ${
                      pathname === "/" || pathname.includes("dashboard")
                        ? "hover:text-slate-200"
                        : "hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setHideSubmenuStatus({
                        ...hideSubmenuStatus,
                        'dashboard': !hideSubmenuStatus.dashboard
                      });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="shrink-0 h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className={`fill-current ${
                              pathname === "/" ||
                              pathname.includes("dashboard") ||
                              pathname.includes("recommendation")
                                ? "text-indigo-500"
                                : "text-slate-400"
                            }`}
                            d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                          />
                          <path
                            className={`fill-current ${
                              pathname === "/" ||
                              pathname.includes("dashboard") ||
                              pathname.includes("recommendation")
                                ? "text-indigo-600"
                                : "text-slate-600"
                            }`}
                            d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                          />
                          <path
                            className={`fill-current ${
                              pathname === "/" ||
                              pathname.includes("dashboard") ||
                              pathname.includes("recommendation")
                                ? "text-indigo-200"
                                : "text-slate-400"
                            }`}
                            d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                          />
                        </svg>
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Dashboard
                        </span>
                      </div>
                      {/* Icon */}
                      <div className="flex shrink-0 ml-2">
                        <svg
                          className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                            !hideSubmenuStatus.dashboard && "rotate-180"
                          }`}
                          viewBox="0 0 12 12"
                        >
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    <ul className={`pl-9 mt-1 ${hideSubmenuStatus.dashboard && "hidden"}`}>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/dashboard"
                          className={({ isActive }) =>
                            "block transition duration-150 truncate " +
                            (isActive
                              ? "text-indigo-500"
                              : "text-slate-400 hover:text-slate-200")
                          }
                        >
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Main
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/dashboard/analytics"
                          className={({ isActive }) =>
                            "block transition duration-150 truncate " +
                            (isActive
                              ? "text-indigo-500"
                              : "text-slate-400 hover:text-slate-200")
                          }
                        >
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Analytics
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to=""
                          className={({ isActive }) =>
                            " " + (isActive ? "" : "")
                          }
                        >
                          {/* Job Board */}
                          <div
                            style={{
                              marginLeft: "-30px",
                              width: "160%",
                              float: "center",
                              position: "relative",
                              bottom: "5px",
                            }}
                          >
                            <SidebarLinkGroup>
                              <React.Fragment>
                                <a
                                  href="#0"
                                  className={` text-slate-200 truncate transition duration-150 ${
                                    pathname === "/" ||
                                    pathname.includes("recommendation")
                                      ? "hover:text-slate-200"
                                      : "hover:text-white"
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setHideSubmenuStatus({
                                      ...hideSubmenuStatus,
                                      'recommendation': !hideSubmenuStatus.recommendation
                                    });
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Recommendation
                                      </span>
                                    </div>
                                    {/* Icon */}
                                    <div className="flex shrink-0 ml-2">
                                      <svg
                                        className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                          !hideSubmenuStatus.recommendation && "rotate-180"
                                        }`}
                                        viewBox="0 0 12 12"
                                        style={{
                                          position: "relative",
                                          right: "60px",
                                        }}
                                      >
                                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                                <div
                                  className="lg:hidden lg:sidebar-expanded:block 2xl:block"
                                  style={{
                                    position: "relative",
                                    right: "10px",
                                  }}
                                >
                                  <ul
                                    className={`pl-9 mt-1 ${hideSubmenuStatus.recommendation && "hidden"}`}
                                  >
                                    <li className="mb-1 last:mb-0">
                                      <NavLink
                                        end
                                        to="/dashboard/recommendation/trending-hashtags"
                                        className={({ isActive }) =>
                                          "block transition duration-150 truncate " +
                                          (isActive
                                            ? "text-indigo-500"
                                            : "text-slate-400 hover:text-slate-200")
                                        }
                                      >
                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          Trending Hashtags
                                        </span>
                                      </NavLink>
                                    </li>

                                    <NavLink
                                      end
                                      to="/dashboard/recommendation/content-suggestions" // Absolute path
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " +
                                        (isActive
                                          ? "text-indigo-500"
                                          : "text-slate-400 hover:text-slate-200")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Content Suggestions
                                      </span>
                                    </NavLink>

                                    <NavLink
                                      end
                                      to="/dashboard/recommendation/meta-data-suggestions" // Absolute path
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " +
                                        (isActive
                                          ? "text-indigo-500"
                                          : "text-slate-400 hover:text-slate-200")
                                      }
                                      
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Metadata Suggestions
                                      </span>
                                    </NavLink>
                                  </ul>
                                </div>
                              </React.Fragment>
                            </SidebarLinkGroup>
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              </SidebarLinkGroup>

              {/* Add Video Url */}
              <SidebarLinkGroup>
            
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("video-url")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg
                            className="shrink-0 h-6 w-6"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className={`fill-current ${
                                pathname.includes("video-url")
                                  ? "text-indigo-500"
                                  : "text-slate-600"
                              }`}
                              d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                            />
                            <path
                              className={`fill-current ${
                                pathname.includes("video-url")
                                  ? "text-indigo-300"
                                  : "text-slate-400"
                              }`}
                              d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                            />
                          </svg>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/video-url"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-200 hover:text-slate-200")
                              }
                            >
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Add Video URL
                              </span>
                            </NavLink>
                          </li>
                        </div>
                        {/* Icon */}
                        <div className="flex shrink-0 ml-2">
                          <svg
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                              open && "rotate-180"
                            }`}
                            viewBox="0 0 12 12"
                          ></svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-9 mt-1 ${!open && "hidden"}`}></ul>
                    </div>
                  </React.Fragment>
                
              </SidebarLinkGroup>

              {/* Add Channel Url */}
              <SidebarLinkGroup>
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("channel-url")
                          ? "hover:text-white"
                          : "hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg
                            className="shrink-0 h-6 w-6"
                            viewBox="0 0 24 24"
                          >
                            {/* Plus icon */}
                            <path
                              className={`fill-current ${
                                pathname.includes("channel-url")
                                  ? "text-indigo-300"
                                  : "text-slate-400"
                              }`}
                              d="M19 11H13V5c0-.552-.448-1-1-1s-1 .448-1 1v6H5c-.552 0-1 .448-1 1s.448 1 1 1h6v6c0 .552.448 1 1 1s1-.448 1-1v-6h6c.552 0 1-.448 1-1s-.448-1-1-1z"
                            />
                            {/* Path for circle */}
                            <path
                              className={`fill-current ${
                                pathname.includes("channel-url")
                                  ? "text-indigo-500"
                                  : "text-slate-700"
                              }`}
                              d="M18 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                            />
                            {/* Path for circle */}
                            <path
                              className={`fill-current ${
                                pathname.includes("channel-url")
                                  ? "text-indigo-600"
                                  : "text-slate-600"
                              }`}
                              d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                            />
                          </svg>

                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/channel-url"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive
                                    ? "text-indigo-500"
                                    : "text-slate-200 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Add Channel URL
                                </span>
                              </NavLink>
                            </li>
                          </span>
                        </div>
                        {/* Icon */}
                      </div>
                    </a>
                  </React.Fragment>
              </SidebarLinkGroup>


              {/* Settings */}
              <SidebarLinkGroup
              >
                <React.Fragment>
                  <a
                    href="#0"
                    className={`block text-slate-200 truncate transition duration-150 ${
                      pathname.includes("settings")
                        ? "hover:text-slate-200"
                        : "hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setHideSubmenuStatus({
                        ...hideSubmenuStatus,
                        'settings': !hideSubmenuStatus.settings
                      });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="shrink-0 h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className={`fill-current ${
                              pathname.includes("settings")
                                ? "text-indigo-500"
                                : "text-slate-600"
                            }`}
                            d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                          />
                          <path
                            className={`fill-current ${
                              pathname.includes("settings")
                                ? "text-indigo-300"
                                : "text-slate-400"
                            }`}
                            d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                          />
                          <path
                            className={`fill-current ${
                              pathname.includes("settings")
                                ? "text-indigo-500"
                                : "text-slate-600"
                            }`}
                            d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                          />
                          <path
                            className={`fill-current ${
                              pathname.includes("settings")
                                ? "text-indigo-300"
                                : "text-slate-400"
                            }`}
                            d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                          />
                        </svg>
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Settings
                        </span>
                      </div>
                      {/* Icon */}
                      <div className="flex shrink-0 ml-2">
                        <svg
                          className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                            !hideSubmenuStatus.settings && "rotate-180"
                          }`}
                          viewBox="0 0 12 12"
                        >
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    <ul className={`pl-9 mt-1 ${hideSubmenuStatus.settings && "hidden"}`}>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/settings/account"
                          className={({ isActive }) =>
                            "block transition duration-150 truncate " +
                            (isActive
                              ? "text-indigo-500"
                              : "text-slate-400 hover:text-slate-200")
                          }
                        >
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            My Account
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/settings/notifications"
                          className={({ isActive }) =>
                            "block transition duration-150 truncate " +
                            (isActive
                              ? "text-indigo-500"
                              : "text-slate-400 hover:text-slate-200")
                          }
                        >
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            My Notifications
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;