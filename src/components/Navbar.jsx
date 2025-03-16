import { ChevronDown, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [academicDropdown, setAcademicDropdown] = useState(false);

  return (
    <nav className="text-white py-2 fixed top-0 left-0 w-full z-50" style={{ backgroundColor: "#111" }}>
      <div className="container max-w-screen-xl mx-auto px-3 gap-1 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold whitespace-nowrap">জামিয়া হুসাইনিয়া মাদ্রাসা</h1>

        {/* Mobile Menu Button */}
        <span className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </span>

        {/* Navbar Links */}
        <ul className={`lg:flex gap-1 whitespace-nowrap items-center absolute lg:static top-16 left-0 right-0 w-full bg-gray-900 lg:bg-transparent text-center lg:text-left lg:w-auto lg:p-0 p-4 z-50 transition-all duration-300 ease-in-out ${isOpen ? "flex flex-col gap-2" : "hidden"}`}>

          {/* হোম */}
          <li className="text-lg">
            <NavLink to="/" className={({ isActive }) => isActive ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white" : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"}>
              হোম
            </NavLink>
          </li>

          {/* মাদ্রাসা সম্পর্কে (Dropdown) */}
          <li
            className="relative group text-lg"
            onMouseOver={() => window.innerWidth > 1024 && setDropdownOpen(true)}
            onMouseOut={() => window.innerWidth > 1024 && setDropdownOpen(false)}
            onClick={() => window.innerWidth <= 1024 && setDropdownOpen(!dropdownOpen)}
          >
            <a className="px-4 transform cursor-pointer flex items-center">
              মাদ্রাসা সম্পর্কে <ChevronDown className="ml-1" size={16} />
            </a>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-1 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden w-52 z-50">
                <li>
                  <NavLink to="/about" className="block px-4 py-2 hover:bg-blue-600">
                    মাদ্রাসা সম্পর্কে
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/photo-gallery" className="block px-4 py-2 hover:bg-blue-600">
                    ফটো গ্যালারি
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/video-gallery" className="block px-4 py-2 hover:bg-blue-600">
                    ভিডিও গ্যালারি
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/financial-report" className="block px-4 py-2 hover:bg-blue-600">
                  আর্থিক প্রতিবেদন
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* শিক্ষকবৃন্দ */}
          <li className="text-lg">
            <NavLink to="/teachers" className={({ isActive }) => isActive ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white" : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"}>
              শিক্ষকবৃন্দ
            </NavLink>
          </li>

          {/* যোগাযোগ */}
          <li className="text-lg">
            <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white" : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"}>
              যোগাযোগ
            </NavLink>
          </li>

          {/* একাডেমিক (Dropdown) */}
          <li
            className="relative group text-lg"
            onMouseOver={() => window.innerWidth > 1024 && setAcademicDropdown(true)}
            onMouseOut={() => window.innerWidth > 1024 && setAcademicDropdown(false)}
            onClick={() => window.innerWidth <= 1024 && setAcademicDropdown(!academicDropdown)}
          >
            <a className="px-4 transform cursor-pointer flex items-center">
              একাডেমিক <ChevronDown className="ml-1" size={16} />
            </a>

            {academicDropdown && (
              <ul className="absolute left-0 mt-1 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden w-52 z-50">
                <li>
                  <NavLink to="/academic" className="block px-4 py-2 hover:bg-blue-600">
                    একাডেমিক
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/book-introduction" className="block px-4 py-2 hover:bg-blue-600">
                    বই পরিচিতি
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/results" className="block px-4 py-2 hover:bg-blue-600">
                    ফলাফল
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* অন্যান্য মেনু */}
          {[
            { to: "/admission", label: "ভর্তি" },
            { to: "/notice", label: "নোটিশ" },
          ].map((item, index) => (
            <li key={index} className="text-lg">
              <NavLink to={item.to} className={({ isActive }) => isActive ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white" : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"}>
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