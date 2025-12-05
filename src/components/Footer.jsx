import {
  FaArrowUp,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import qrCodeImage from "/qr-code.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-900 dark:from-slate-900 dark:via-slate-950 dark:to-black text-emerald-50 pt-5 pb-5">
      {/* Top Decorative Divider */}
      <div className="absolute inset-x-0 -top-6 mx-auto w-40 h-1.5 rounded-full bg-emerald-400/60 blur-xl opacity-70"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Important Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 tracking-[0.05em]">
            গুরুত্বপূর্ণ লিংকসমূহ
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              [
                "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ",
                "https://www.wifaqbd.org/",
              ],
              ["মুআসসাসা ইলমিয়্যাহ বাংলাদেশ", "https://mibd.org/"],
              ["মাসিক আল কাউসার", "https://www.alkawsar.com/bn/"],
              [
                "রিসালাতুল ইসলাম বাংলাদেশ",
                "https://ilmdrive.com/risalatul-islam-bd/",
              ],
              [
                "রিসালাতুল ইসলাম BD ইউটিউব",
                "https://www.youtube.com/@RisalatulIslamBD/playlists",
              ],
            ].map(([label, link], idx) => (
              <li key={idx}>
                <a
                  href={link}
                  target="_blank"
                  className="hover:text-white/90 hover:underline transition-all duration-150"
                >
                  ✦ {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* QR Code */}
        <div>
          <h3 className="text-xl font-bold mb-4 tracking-[0.05em]">
            স্ক্যান করুন
          </h3>
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-44 h-44 rounded-xl border border-emerald-200 shadow-lg shadow-black/20 mx-auto lg:mx-0"
          />
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 tracking-[0.05em]">যোগাযোগ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-300" />
              jamiyahusainiya1@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-emerald-300" />
              +8801751699909
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-emerald-300" />
              <a
                href="https://www.google.com/maps/place/জামিয়া+হুসাইনিয়া"
                target="_blank"
                className="hover:underline hover:text-white/90"
              >
                শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট, বাংলাদেশ
              </a>
            </li>

            <li className="pt-2 border-t border-emerald-500/40">
              <p className="text-sm leading-relaxed">
                পূবালী ব্যাংক একাউন্ট নম্বর:
                <span className="font-semibold"> 3070101040683</span>
                <br />
                ব্রাঞ্চ: BS25-C-0717526 TO BS25-C-0717550
              </p>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 tracking-[0.05em]">ফলো করুন</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/profile.php?id=61573036155447"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://github.com/jamiyahusainiyaosd"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.youtube.com/@RisalatulIslamBD/playlists"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 pt-6 border-t border-emerald-500/30 text-center">
        <p className="text-sm tracking-wide opacity-90">
          &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ,
          হবিগঞ্জ
        </p>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full 
        bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl 
        hover:shadow-emerald-900/60 hover:scale-110 transition-all duration-300 z-50"
      >
        <FaArrowUp className="text-xl" />
      </button>
    </footer>
  );
};

export default Footer;
