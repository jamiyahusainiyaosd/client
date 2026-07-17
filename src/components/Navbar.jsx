import { ChevronDown, HandHeart, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "/nav_logo.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setAboutOpen(false);
    setAcademicOpen(false);
  };

  const DropdownChevron = ({ open }) => (
    <ChevronDown
      className={`ml-1 h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    />
  );

  const dropdownItemClass =
    "block px-5 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 transition-all duration-150 rounded-lg mx-1";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-emerald-900 dark:bg-slate-950 text-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400">🕌</span>
            <span className="font-medium tracking-wide">
              জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
            </span>
            <span className="hidden sm:inline text-emerald-500/60">—</span>
            <span className="hidden sm:inline text-emerald-300/80 text-[11px]">
              সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
            </span>
          </p>
          <p className="text-[11px] sm:text-xs text-emerald-400/80 whitespace-nowrap">
            jamiyahusainiya1@gmail.com
            <span className="mx-2 text-emerald-700">|</span>
            +8801751699909
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-500 ${scrolled
          ? "bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
          } border-b border-slate-200/60 dark:border-slate-800/60`}
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
                <div className="absolute -inset-1.5 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/10 blur-md group-hover:bg-emerald-500/25 transition-all duration-300" />
                <img
                  src={NavLogo}
                  alt="Jamia Husainiya Logo"
                  className="relative h-14 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[15px] font-bold text-slate-900 dark:text-slate-50 leading-tight">
                  জামিয়া হুসাইনিয়া মাদ্রাসা
                </h1>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                  শায়েস্তাগঞ্জ, হবিগঞ্জ
                </p>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-0.5">
                {[
                  { to: "/", label: "হোম" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}

                {/* About dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <button
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setAboutOpen(p => !p);
                      }
                      if (e.key === 'Escape') setAboutOpen(false);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${aboutOpen
                      ? "text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                  >
                    মাদ্রাসা সম্পর্কে
                    <DropdownChevron open={aboutOpen} />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 transition-all duration-200 ${aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                  >
                    <div className="w-56 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-1.5">
                      {[
                        { to: "/about", label: "মাদ্রাসা সম্পর্কে" },
                        { to: "/photo-gallery", label: "ফটো গ্যালারি" },
                        { to: "/video-gallery", label: "ভিডিও গ্যালারি" },
                        { to: "/financial-report", label: "আর্থিক প্রতিবেদন" },
                        { to: "/former-students", label: "সাবেক ছাত্র" },
                      ].map(({ to, label }) => (
                        <NavLink key={to} to={to} className={dropdownItemClass}>
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </li>


                {/* Academic dropdown — after মাদ্রাসা */}
                <li
                  className="relative"
                  onMouseEnter={() => setAcademicOpen(true)}
                  onMouseLeave={() => setAcademicOpen(false)}
                >
                  <button
                    aria-expanded={academicOpen}
                    aria-haspopup="true"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setAcademicOpen(p => !p);
                      }
                      if (e.key === 'Escape') setAcademicOpen(false);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${academicOpen
                      ? "text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                  >
                    একাডেমিক
                    <DropdownChevron open={academicOpen} />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 transition-all duration-200 ${academicOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                  >
                    <div className="w-48 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-1.5">
                      {[
                        { to: "/academic", label: "একাডেমিক" },
                        { to: "/results", label: "ফলাফল" },
                      ].map(({ to, label }) => (
                        <NavLink key={to} to={to} className={dropdownItemClass}>
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
                      `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
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
                        `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
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
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <Sun size={16} className={`absolute transition-all duration-300 ${darkMode ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
                <Moon size={16} className={`absolute transition-all duration-300 ${darkMode ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`} />
              </button>

              <NavLink
                to="/admission"
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 whitespace-nowrap"
              >
                ভর্তি আবেদন
              </NavLink>

              <NavLink
                to="/expatriateGrant"
                className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-all duration-200 whitespace-nowrap"
              >
                <HandHeart size={15} />
                প্রবাসী অনুদান
              </NavLink>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all lg:hidden"
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
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">জামিয়া হুসাইনিয়া</p>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">মেনু</h2>
          </div>
          <button
            onClick={closeDrawer}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
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
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                হোম
              </NavLink>
            </li>

            <li>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                মাদ্রাসা সম্পর্কে
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${aboutOpen ? "max-h-64 mt-1" : "max-h-0"}`}>
                <div className="ml-3 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-0.5">
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
                      className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </li>

            {[
              { to: "/teachers", label: "শিক্ষকবৃন্দ" },
              { to: "/contact", label: "যোগাযোগ" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeDrawer}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                onClick={() => setAcademicOpen(!academicOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                একাডেমিক
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${academicOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${academicOpen ? "max-h-32 mt-1" : "max-h-0"}`}>
                <div className="ml-3 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-0.5">
                  {[
                    { to: "/academic", label: "একাডেমিক" },
                    { to: "/results", label: "ফলাফল" },
                  ].map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={closeDrawer}
                      className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
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
                onClick={closeDrawer}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                নোটিশ
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <NavLink
            to="/expatriateGrant"
            onClick={closeDrawer}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-all"
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