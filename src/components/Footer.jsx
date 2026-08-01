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
    <footer className="relative bg-slate-950  text-slate-300 overflow-hidden">
      {/* Subtle gradient mesh top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Footer Brand Header */}
        <div className="flex items-center gap-4 pb-10 mb-2 border-b border-slate-700/60">
          <img src={NavLogo} alt="Jamia Husainiya Logo" className="h-14 w-auto object-contain opacity-90" />
          <div>
            <p className="text-sm font-bold text-slate-100 leading-tight">জামিয়া হুসাইনিয়া মাদ্রাসা</p>
            <p className="text-xs text-emerald-400/80 mt-0.5">শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট</p>
            <p className="text-[10px] text-slate-500 mt-1">সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা</p>
          </div>
        </div>

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-700/60">

          {/* Important Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2.5">
              {[
                ["বেফাকুল মাদারিসিল আরাবিয়া", "https://www.wifaqbd.org/"],
                ["মুআসসাসা ইলমিয়্যাহ বাংলাদেশ", "https://mibd.org/"],
                ["মাসিক আল কাউসার", "https://www.alkawsar.com/bn/"],
                ["রিসালাতুল ইসলাম বাংলাদেশ", "https://ilmdrive.com/risalatul-islam-bd/"],
                ["রিসালাতুল ইসলাম YouTube", "https://www.youtube.com/@RisalatulIslamBD/playlists"],
              ].map(([label, link], idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 group-hover:bg-emerald-400 transition-colors flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              স্ক্যান করুন
            </h3>
            <div className="inline-block p-2 rounded-2xl bg-white shadow-lg shadow-black/30">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-36 h-36 rounded-xl object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              ফেইসবুক পেজ ভিজিট করতে
              <br />QR কোড স্ক্যান করুন
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              যোগাযোগ
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:jamiyahusainiya1@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors group">
                  <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-700 group-hover:bg-emerald-800/40 transition-colors">
                    <FaEnvelope className="text-emerald-400 text-xs" />
                  </span>
                  jamiyahusainiya1@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801751699909" className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors group">
                  <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-700 group-hover:bg-emerald-800/40 transition-colors">
                    <FaPhoneAlt className="text-emerald-400 text-xs" />
                  </span>
                  +8801751699909
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/জামিয়া+হুসাইনিয়া"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors group"
                >
                  <span className="mt-0.5 h-8 w-8 flex items-center justify-center rounded-lg bg-slate-700 group-hover:bg-emerald-800/40 transition-colors flex-shrink-0">
                    <FaMapMarkerAlt className="text-emerald-400 text-xs" />
                  </span>
                  শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
                </a>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-700">
                <div className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-xs text-slate-400 leading-relaxed">
                  <p className="text-slate-400 mb-1 font-medium">পূবালী ব্যাংক একাউন্ট</p>
                  <p className="font-mono text-slate-300">3070101040683</p>
                  <p className="text-slate-400 text-[10px] mt-1">BS25-C-0717526 TO BS25-C-0717550</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social + Brand */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              ফলো করুন
            </h3>
            <div className="flex gap-3 mb-6">
              {[
                { href: "https://www.facebook.com/profile.php?id=61573036155447", icon: FaFacebookF, label: "Facebook" },
                { href: "https://www.youtube.com/@RisalatulIslamBD/playlists", icon: FaYoutube, label: "YouTube" },
                // eslint-disable-next-line no-unused-vars
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-700 hover:bg-emerald-800/50 border border-slate-400/50 hover:border-emerald-400/50 text-slate-400 hover:text-emerald-400 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-800/40 to-slate-800 border border-emerald-700/30 p-4">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">আমাদের লক্ষ্য</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                কুরআন ও সুন্নাহভিত্তিক দ্বীনি শিক্ষার মাধ্যমে আদর্শ আলেম ও আল্লাহভীরু মানুষ তৈরী করা।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ
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