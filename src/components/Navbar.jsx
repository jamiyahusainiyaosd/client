import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white py-4">
      <div className="max-w-[1144px] mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">জামিয়া হুসাইনিয়া মাদ্রাসা</h1>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`lg:flex gap-4 items-center ${
            isOpen ? "block" : "hidden"
          } absolute lg:static top-16 left-0 w-full bg-gray-900 lg:bg-transparent text-center lg:text-left lg:w-auto lg:p-0 p-4 z-50`}
        >
          <li className="text-xl font-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              হোম
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              মাদ্রাসা সম্পর্কে
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              যোগাযোগ
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/academic"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              একাডেমিক
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              শিক্ষকবৃন্দ
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/admission"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              ভর্তি
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink
              to="/notice"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                  : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
              }
            >
              নোটিশ
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
