import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navItems from "../constants/navItems.contants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white py-4">
      <div className="max-w-[1144px] mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold whitespace-nowrap">
          জামিয়া হুসাইনিয়া মাদ্রাসা
        </h1>

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
          {navItems.map((item) => (
            <li className="text-xl font-bold">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 lg:inline font-bold !bg-blue-600 hover:border-2 hover:!bg-transparent hover:border-white border-b-2 rounded-[8px] border-white"
                    : "block py-2 px-4 lg:inline hover:!bg-blue-500 hover:rounded-[8px] hover:border-b-2 hover:border-white"
                }
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
