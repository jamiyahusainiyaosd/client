import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import NavLogo from "/nav_logo.png";
import qrCodeImage from "/qr-code.png";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden border-t border-slate-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Footer Brand Header */}
        <div className="flex items-center gap-4 pb-8 mb-2 border-b border-slate-800">
          <img
            src={NavLogo}
            alt="Jamia Husainiya Logo"
            className="h-12 w-auto object-contain opacity-95"
          />
          <div>
            <p className="text-base font-bold text-white leading-tight font-display">
              জামিয়া হুসাইনিয়া মাদ্রাসা
            </p>
            <p className="text-xs text-emerald-400 mt-0.5 font-medium">
              শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
            </p>
            <p className="text-xs text-slate-400 mt-1">
              সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
            </p>
          </div>
        </div>

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-slate-800">
          {/* Important Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2.5">
              {[
                ["বেফাকুল মাদারিসিল আরাবিয়া", "https://www.wifaqbd.org/"],
                ["মুআসসাসা ইলমিয়্যাহ বাংলাদেশ", "https://mibd.org/"],
                ["মাসিক আল কাউসার", "https://www.alkawsar.com/bn/"],
                [
                  "রিসালাতুল ইসলাম বাংলাদেশ",
                  "https://ilmdrive.com/risalatul-islam-bd/",
                ],
                [
                  "রিসালাতুল ইসলাম YouTube",
                  "https://www.youtube.com/@RisalatulIslamBD/playlists",
                ],
              ].map(([label, link], idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-xs text-slate-300 hover:text-emerald-400 transition-colors duration-150"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500 flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono">
              স্ক্যান করুন
            </h3>
            <div className="inline-block p-2 rounded-lg bg-white shadow-sm">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-32 h-32 rounded object-cover"
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
              ফেইসবুক পেজ ভিজিট করতে
              <br />
              QR কোড স্ক্যান করুন
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono">
              যোগাযোগ
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="mailto:jamiyahusainiya1@gmail.com"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    <FaEnvelope className="text-emerald-400 text-xs" />
                  </span>
                  <span className="font-mono">jamiyahusainiya1@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801751699909"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    <FaPhoneAlt className="text-emerald-400 text-xs" />
                  </span>
                  <span className="font-mono">+8801751699909</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/জামিয়া+হুসাইনিয়া"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <span className="mt-0.5 h-7 w-7 flex items-center justify-center rounded bg-slate-800 group-hover:bg-slate-700 transition-colors flex-shrink-0">
                    <FaMapMarkerAlt className="text-emerald-400 text-xs" />
                  </span>
                  শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
                </a>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-800">
                <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 px-3.5 py-2.5 text-xs text-slate-300 leading-relaxed">
                  <p className="text-slate-400 mb-1 font-medium">
                    পূবালী ব্যাংক একাউন্ট
                  </p>
                  <p className="font-mono font-semibold text-white tracking-wide">
                    3070101040683
                  </p>
                  <p className="text-slate-400 text-[10px] mt-0.5 font-mono">
                    BS25-C-0717526 TO BS25-C-0717550
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social + Brand */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono">
              ফলো করুন
            </h3>
            <div className="flex gap-2.5 mb-5">
              {[
                {
                  href: "https://www.facebook.com/profile.php?id=61573036155447",
                  icon: FaFacebookF,
                  label: "Facebook",
                },
                {
                  href: "https://www.youtube.com/@RisalatulIslamBD/playlists",
                  icon: FaYoutube,
                  label: "YouTube",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-all duration-150"
                >
                  <item.icon size={13} />
                </a>
              ))}
            </div>

            <div className="rounded-lg bg-slate-800/60 border border-slate-700/60 p-4">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5 font-mono">
                আমাদের লক্ষ্য
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                কুরআন ও সুন্নাহভিত্তিক দ্বীনি শিক্ষার মাধ্যমে আদর্শ আলেম ও
                আল্লাহভীরু মানুষ তৈরী করা।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ,
            হবিগঞ্জ
          </p>
          <p className="text-xs text-slate-400">
            সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
