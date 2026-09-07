import { ChevronDown, HandHeart, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavLogo from "/nav_logo.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicOpen, setMobileAcademicOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const aboutTimeoutRef = useRef(null);
  const academicTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeDrawer();
  }, [location.pathname]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (academicTimeoutRef.current) clearTimeout(academicTimeoutRef.current);
    };
  }, []);

  const handleAboutEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 160);
  };

  const handleAcademicEnter = () => {
    if (academicTimeoutRef.current) clearTimeout(academicTimeoutRef.current);
    setAcademicOpen(true);
  };

  const handleAcademicLeave = () => {
    if (academicTimeoutRef.current) clearTimeout(academicTimeoutRef.current);
    academicTimeoutRef.current = setTimeout(() => {
      setAcademicOpen(false);
    }, 160);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setAboutOpen(false);
    setAcademicOpen(false);
    setMobileAboutOpen(false);
    setMobileAcademicOpen(false);
  };

  const DropdownChevron = ({ open }) => (
    <ChevronDown
      className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out ${
        open ? "rotate-180 text-emerald-600" : "text-slate-400"
      }`}
    />
  );

  const dropdownItemClass =
    "block px-4 py-2.5 text-sm text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/90 font-medium transition-all duration-200 rounded-xl mx-1";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-slate-900 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400">🕌</span>
            <span className="font-medium tracking-wide">
              জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
            </span>
            <span className="hidden sm:inline text-slate-600">—</span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
            </span>
          </p>
          <p className="text-[11px] sm:text-xs text-slate-300 whitespace-nowrap">
            jamiyahusainiya1@gmail.com
            <span className="mx-2 text-slate-600">|</span>
            +8801751699909
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : "bg-white/95 backdrop-blur-xl"
        } border-b border-slate-200/60`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center gap-4">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-3 shrink-0 group"
              onClick={closeDrawer}
            >
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-xl bg-emerald-500/15 blur-md group-hover:bg-emerald-500/25 transition-all duration-300" />
                <img
                  src={NavLogo}
                  alt="Jamia Husainiya Logo"
                  className="relative h-14 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[15px] font-bold text-slate-900 leading-tight">
                  জামিয়া হুসাইনিয়া মাদ্রাসা
                </h1>
                <p className="text-[10px] text-slate-400 leading-tight">
                  শায়েস্তাগঞ্জ, হবিগঞ্জ
                </p>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1">
                {[{ to: "/", label: "হোম" }].map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-emerald-600 bg-emerald-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}

                {/* About dropdown */}
                <li
                  className="relative group py-2"
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                >
                  <button
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                    onClick={() => setAboutOpen((prev) => !prev)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setAboutOpen((p) => !p);
                      }
                      if (e.key === "Escape") setAboutOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center cursor-pointer ${
                      aboutOpen
                        ? "text-emerald-700 bg-emerald-50/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    মাদ্রাসা সম্পর্কে
                    <DropdownChevron open={aboutOpen} />
                  </button>

                  {/* Dropdown Menu with hover bridge & smooth scale/opacity */}
                  <div
                    className={`absolute left-0 top-full pt-1.5 z-50 origin-top-left transition-all duration-300 ease-out ${
                      aboutOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none invisible"
                    }`}
                  >
                    <div className="w-56 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-1.5 transition-all duration-300">
                      {[
                        { to: "/about", label: "মাদ্রাসা সম্পর্কে" },
                        { to: "/photo-gallery", label: "ফটো গ্যালারি" },
                        { to: "/video-gallery", label: "ভিডিও গ্যালারি" },
                        { to: "/financial-report", label: "আর্থিক প্রতিবেদন" },
                        { to: "/former-students", label: "সাবেক ছাত্র" },
                      ].map(({ to, label }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={() => setAboutOpen(false)}
                          className={dropdownItemClass}
                        >
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </li>

                {/* Academic dropdown — after মাদ্রাসা */}
                <li
                  className="relative group py-2"
                  onMouseEnter={handleAcademicEnter}
                  onMouseLeave={handleAcademicLeave}
                >
                  <button
                    aria-expanded={academicOpen}
                    aria-haspopup="true"
                    onClick={() => setAcademicOpen((prev) => !prev)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setAcademicOpen((p) => !p);
                      }
                      if (e.key === "Escape") setAcademicOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center cursor-pointer ${
                      academicOpen
                        ? "text-emerald-700 bg-emerald-50/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    একাডেমিক
                    <DropdownChevron open={academicOpen} />
                  </button>

                  {/* Dropdown Menu with hover bridge & smooth scale/opacity */}
                  <div
                    className={`absolute left-0 top-full pt-1.5 z-50 origin-top-left transition-all duration-300 ease-out ${
                      academicOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none invisible"
                    }`}
                  >
                    <div className="w-48 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-1.5 transition-all duration-300">
                      {[
                        { to: "/academic", label: "একাডেমিক" },
                        { to: "/results", label: "ফলাফল" },
                      ].map(({ to, label }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={() => setAcademicOpen(false)}
                          className={dropdownItemClass}
                        >
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </li>

                <li>
                  <NavLink
                    to="/notice"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`
                    }
                  >
                    নোটিশ
                  </NavLink>
                </li>

                {[
                  { to: "/teachers", label: "শিক্ষকবৃন্দ" },
                  { to: "/contact", label: "যোগাযোগ" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-emerald-600 bg-emerald-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <NavLink
                to="/admission"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 whitespace-nowrap"
              >
                ভর্তি আবেদন
              </NavLink>

              <NavLink
                to="/expatriateGrant"
                className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 whitespace-nowrap"
              >
                <HandHeart size={15} className="text-emerald-600" />
                প্রবাসী অনুদান
              </NavLink>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ease-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              জামিয়া হুসাইনিয়া
            </p>
            <h2 className="text-base font-bold text-slate-900">মেনু</h2>
          </div>
          <button
            onClick={closeDrawer}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                onClick={closeDrawer}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
              >
                হোম
              </NavLink>
            </li>

            {/* Mobile About */}
            <li>
              <button
                type="button"
                onClick={() => setMobileAboutOpen((prev) => !prev)}
                className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>মাদ্রাসা সম্পর্কে</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ease-out ${
                    mobileAboutOpen ? "rotate-180 text-emerald-600" : "text-slate-400"
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  mobileAboutOpen
                    ? "grid-rows-[1fr] opacity-100 mt-1"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-3 pl-3 border-l-2 border-emerald-200 space-y-0.5 py-1">
                    {[
                      { to: "/about", label: "মাদ্রাসা সম্পর্কে" },
                      { to: "/photo-gallery", label: "ফটো গ্যালারি" },
                      { to: "/video-gallery", label: "ভিডিও গ্যালারি" },
                      { to: "/financial-report", label: "আর্থিক প্রতিবেদন" },
                      { to: "/former-students", label: "সাবেক ছাত্র" },
                    ].map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={closeDrawer}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Mobile Academic */}
            <li>
              <button
                type="button"
                onClick={() => setMobileAcademicOpen((prev) => !prev)}
                className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>একাডেমিক</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ease-out ${
                    mobileAcademicOpen ? "rotate-180 text-emerald-600" : "text-slate-400"
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  mobileAcademicOpen
                    ? "grid-rows-[1fr] opacity-100 mt-1"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-3 pl-3 border-l-2 border-emerald-200 space-y-0.5 py-1">
                    {[
                      { to: "/academic", label: "একাডেমিক" },
                      { to: "/results", label: "ফলাফল" },
                    ].map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={closeDrawer}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {[
              { to: "/notice", label: "নোটিশ" },
              { to: "/teachers", label: "শিক্ষকবৃন্দ" },
              { to: "/contact", label: "যোগাযোগ" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeDrawer}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-100  space-y-2">
          <NavLink
            to="/expatriateGrant"
            onClick={closeDrawer}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-200  bg-emerald-50  px-4 py-2.5 text-sm font-semibold text-emerald-700  transition-all"
          >
            <HandHeart size={15} />
            প্রবাসী অনুদান
          </NavLink>
          <NavLink
            to="/admission"
            onClick={closeDrawer}
            className="flex items-center justify-center w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-all"
          >
            ভর্তি আবেদন
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
