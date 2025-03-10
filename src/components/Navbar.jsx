import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white py-3" style={{ backgroundColor: '#111' }}>
      <div className="container max-w-screen-xl mx-auto px-2 gap-1 py-3 flex items-center justify-between">
        <h1 className="md:text-3xl font-bold whitespace-nowrap">জামিয়া হুসাইনিয়া মাদ্রাসা</h1>

        {/* Mobile Menu Button */}
        <sapn className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </sapn>

        {/* Navbar Links */}
        <ul
          className={`lg:flex gap-1 whitespace-nowrap items-center absolute lg:static top-16 left-0 right-0 w-full bg-gray-900 lg:bg-transparent text-center lg:text-left lg:w-auto lg:p-0 p-4 z-50 transition-all duration-300 ease-in-out ${isOpen ? "flex flex-col gap-2" : "hidden"
            }`}
        >
          {[
            { to: "/", label: "হোম" },
            { to: "/about", label: "মাদ্রাসা সম্পর্কে" },
            { to: "/contact", label: "যোগাযোগ" },
            { to: "/academic", label: "একাডেমিক" },
            { to: "/teachers", label: "শিক্ষকবৃন্দ" },
            { to: "/admission", label: "ভর্তি" },
            { to: "/notice", label: "নোটিশ" },
          ].map((item, index) => (
            <li key={index} className="text-lg">
              <NavLink
                to={item.to}
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