import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [academicDropdown, setAcademicDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="py-2 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="container max-w-screen-xl mx-auto px-3 gap-1 py-3 flex items-center justify-between">
        <img
          src={NavLogo}
          alt="NavLogo"
          className="object-cover w-16 h-16 shadow-2xl rounded-full border border-gray-300 dark:border-gray-600"
        />
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-white bg-blue-600 dark:bg-blue-400 rounded-full transition-colors"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <span
            className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </span>
        </div>

        <ul
          className={`lg:flex gap-1 whitespace-nowrap items-center lg:static lg:bg-transparent text-center lg:text-left lg:w-auto lg:p-0 z-50 transition-all duration-300 ease-in-out ${
            isOpen
              ? "flex flex-col gap-2 fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 p-4 shadow-2xl overflow-y-auto"
              : "hidden"
          }`}
        >
          <li className="text-lg w-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 font-bold bg-blue-600 dark:bg-blue-400 text-white dark:text-black rounded-md shadow-md hover:shadow-lg transition-all"
                  : "block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md transition-colors"
              }
              onClick={() => setIsOpen(false)}
            >
              হোম
            </NavLink>
          </li>

          {/* About Madrasa Dropdown */}
          <li
            className="relative group text-lg w-full"
            onMouseEnter={() =>
              window.innerWidth > 1024 && setDropdownOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth > 1024 && setDropdownOpen(false)
            }
          >
            <div
              className="flex items-center justify-between px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => {
                if (window.innerWidth <= 1024) {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              <span>মাদ্রাসা সম্পর্কে</span>
              <ChevronDown
                className={`ml-1 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                size={16}
              />
            </div>

            <ul
              className={`lg:absolute lg:left-0 lg:mt-0 bg-white dark:bg-gray-800 shadow-xl rounded-md overflow-hidden lg:w-56 w-full z-50 border border-gray-200 dark:border-gray-700 ${
                dropdownOpen ? "block" : "hidden"
              } lg:group-hover:block`}
            >
              <li>
                <NavLink
                  to="/about"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  মাদ্রাসা সম্পর্কে
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/photo-gallery"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  ফটো গ্যালারি
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/video-gallery"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  ভিডিও গ্যালারি
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/financial-report"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  আর্থিক প্রতিবেদন
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="text-lg w-full">
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 font-bold bg-blue-600 dark:bg-blue-400 text-white dark:text-black rounded-md shadow-md hover:shadow-lg transition-all"
                  : "block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md transition-colors"
              }
              onClick={() => setIsOpen(false)}
            >
              শিক্ষকবৃন্দ
            </NavLink>
          </li>

          <li className="text-lg w-full">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 font-bold bg-blue-600 dark:bg-blue-400 text-white dark:text-black rounded-md shadow-md hover:shadow-lg transition-all"
                  : "block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md transition-colors"
              }
              onClick={() => setIsOpen(false)}
            >
              যোগাযোগ
            </NavLink>
          </li>

          {/* Academic Dropdown */}
          <li
            className="relative group text-lg w-full"
            onMouseEnter={() =>
              window.innerWidth > 1024 && setAcademicDropdown(true)
            }
            onMouseLeave={() =>
              window.innerWidth > 1024 && setAcademicDropdown(false)
            }
          >
            <div
              className="flex items-center justify-between px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => {
                if (window.innerWidth <= 1024) {
                  setAcademicDropdown(!academicDropdown);
                }
              }}
            >
              <span>একাডেমিক</span>
              <ChevronDown
                className={`ml-1 transition-transform ${
                  academicDropdown ? "rotate-180" : ""
                }`}
                size={16}
              />
            </div>

            <ul
              className={`lg:absolute lg:left-0 lg:mt-0 bg-white dark:bg-gray-800 shadow-xl rounded-md overflow-hidden lg:w-56 w-full z-50 border border-gray-200 dark:border-gray-700 ${
                academicDropdown ? "block" : "hidden"
              } lg:group-hover:block`}
            >
              <li>
                <NavLink
                  to="/academic"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setAcademicDropdown(false);
                  }}
                >
                  একাডেমিক
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/book-introduction"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setAcademicDropdown(false);
                  }}
                >
                  বই পরিচিতি
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/results"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setAcademicDropdown(false);
                  }}
                >
                  ফলাফল
                </NavLink>
              </li>
            </ul>
          </li>

          {[
            { to: "/admission", label: "ভর্তি" },
            { to: "/notice", label: "নোটিশ" },
          ].map((item, index) => (
            <li key={index} className="text-lg w-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 font-bold bg-blue-600 dark:bg-blue-400 text-white dark:text-black rounded-md shadow-md hover:shadow-lg transition-all"
                    : "block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-md transition-colors"
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
