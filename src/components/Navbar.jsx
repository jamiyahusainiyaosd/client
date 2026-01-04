import { ChevronDown, HandHeart, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "/nav_logo.png";

const navLinkBase =
  "inline-flex items-center whitespace-nowrap px-3 xl:px-4 py-2 text-sm font-medium rounded-full transition-all duration-200";
const navLinkInactive =
  "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/40";
const navLinkActive =
  "text-white bg-emerald-600 shadow-[0_10px_30px_rgba(16,185,129,0.5)] dark:bg-emerald-500 dark:text-slate-900";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);

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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setAboutOpen(false);
    setAcademicOpen(false);
  };

  const DropdownChevron = ({ open }) => (
    <ChevronDown
      className={`ml-1 mt-[1px] h-4 w-4 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="block bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-xs text-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/40 ring-1 ring-emerald-300/60">
              🕌
            </span>
            <span className="font-medium">
              জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
              <br />
              <span className="text-xs text-slate-200/80 inline sm:hidden">
                সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
              </span>
            </span>
          </p>

          <p className="text-[10px] sm:text-xs whitespace-nowrap text-center">
            ই-মেইল: jamiyahusainiya1@gmail.com <span> | </span>
            মোবাইল: +8801751699909
          </p>
        </div>
      </div>

      <nav className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/70 dark:border-slate-700/60 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center gap-4">
            <NavLink
              to="/"
              className="flex items-center gap-3 shrink-0"
              onClick={closeDrawer}
            >
              <div className="relative flex items-center">
                <div className="absolute -inset-2 rounded-xl bg-emerald-500/20 blur-lg" />
                <img
                  src={NavLogo}
                  alt="Jamia Husainiya Logo"
                  className="h-16 w-auto object-contain"
                  style={{ imageRendering: "auto" }}
                />
              </div>

              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                  Jamia Husainiya
                </p>
                <h1 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-50">
                  জামিয়া হুসাইনিয়া মাদ্রাসা
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
                </p>
              </div>
            </NavLink>

            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1 text-sm font-medium">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${navLinkBase} ${
                        isActive ? navLinkActive : navLinkInactive
                      }`
                    }
                  >
                    হোম
                  </NavLink>
                </li>

                <li
                  className="relative"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <button className={`${navLinkBase} ${navLinkInactive}`}>
                    মাদ্রাসা সম্পর্কে <DropdownChevron open={aboutOpen} />
                  </button>

                  {aboutOpen && (
                    <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                      <ul className="py-2 text-sm">
                        <li>
                          <NavLink
                            to="/about"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            মাদ্রাসা সম্পর্কে
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/photo-gallery"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            ফটো গ্যালারি
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/video-gallery"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            ভিডিও গ্যালারি
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/financial-report"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            আর্থিক প্রতিবেদন
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/former-students"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            সাবেক ছাত্র
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink
                    to="/teachers"
                    className={({ isActive }) =>
                      `${navLinkBase} ${
                        isActive ? navLinkActive : navLinkInactive
                      }`
                    }
                  >
                    শিক্ষকবৃন্দ
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `${navLinkBase} ${
                        isActive ? navLinkActive : navLinkInactive
                      }`
                    }
                  >
                    যোগাযোগ
                  </NavLink>
                </li>

                <li
                  className="relative"
                  onMouseEnter={() => setAcademicOpen(true)}
                  onMouseLeave={() => setAcademicOpen(false)}
                >
                  <button className={`${navLinkBase} ${navLinkInactive}`}>
                    একাডেমিক <DropdownChevron open={academicOpen} />
                  </button>

                  {academicOpen && (
                    <div className="absolute left-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                      <ul className="py-2 text-sm">
                        <li>
                          <NavLink
                            to="/academic"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            একাডেমিক
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/results"
                            className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          >
                            ফলাফল
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink
                    to="/notice"
                    className={({ isActive }) =>
                      `${navLinkBase} ${
                        isActive ? navLinkActive : navLinkInactive
                      }`
                    }
                  >
                    নোটিশ
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <button
                onClick={toggleDarkMode}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-amber-300 shadow-lg shadow-slate-900/40 ring-2 ring-slate-900/70 dark:bg-amber-400 dark:text-slate-900 dark:ring-amber-300/70 transition-all hover:scale-105"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <NavLink
                to="/admission"
                className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                ভর্তি আবেদন
              </NavLink>

              <NavLink
                to="/expatriateGrant"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <HandHeart size={18} />
                প্রবাসী অনুদান
              </NavLink>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
        ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 shadow-xl z-50
        transition-transform duration-300
        ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            মেনু
          </h2>
          <button onClick={closeDrawer} aria-label="Close menu">
            <X size={24} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-2 text-base font-medium">
          <NavLink
            to="/"
            onClick={closeDrawer}
            className="px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
          >
            হোম
          </NavLink>

          <li>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            >
              মাদ্রাসা সম্পর্কে
              <ChevronDown
                className={`transition-transform ${
                  aboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ml-4 border-l border-slate-200 dark:border-slate-700 ${
                aboutOpen ? "max-h-80 mt-2" : "max-h-0"
              }`}
            >
              <NavLink
                to="/about"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                মাদ্রাসা সম্পর্কে
              </NavLink>
              <NavLink
                to="/photo-gallery"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                ফটো গ্যালারি
              </NavLink>
              <NavLink
                to="/video-gallery"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                ভিডিও গ্যালারি
              </NavLink>
              <NavLink
                to="/financial-report"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                আর্থিক প্রতিবেদন
              </NavLink>

              <NavLink
                to="/former-students"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                সাবেক ছাত্র
              </NavLink>
            </div>
          </li>

          <NavLink
            to="/teachers"
            onClick={closeDrawer}
            className="px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
          >
            শিক্ষকবৃন্দ
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeDrawer}
            className="px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
          >
            যোগাযোগ
          </NavLink>

          <li>
            <button
              onClick={() => setAcademicOpen(!academicOpen)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            >
              একাডেমিক
              <ChevronDown
                className={`transition-transform ${
                  academicOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ml-4 border-l border-slate-200 dark:border-slate-700 ${
                academicOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <NavLink
                to="/academic"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                সকল একাডেমিক
              </NavLink>

              <NavLink
                to="/results"
                onClick={closeDrawer}
                className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
              >
                ফলাফল
              </NavLink>
            </div>
          </li>

          <NavLink
            to="/notice"
            onClick={closeDrawer}
            className="px-4 py-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
          >
            নোটিশ
          </NavLink>

          <NavLink
            to="/expatriateGrant"
            onClick={closeDrawer}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <HandHeart size={18} />
            প্রবাসী অনুদান
          </NavLink>

          <NavLink
            to="/admission"
            onClick={closeDrawer}
            className="mt-3 inline-flex items-center justify-center rounded-full
            bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm
            font-semibold text-white shadow-lg"
          >
            ভর্তি আবেদন
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
