import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import NavLogo from "/nav_logo.png";
import qrCodeImage from "/qr-code.png";
import { useContactSettings } from "../features/contactus/hooks/useContactSettings";

const Footer = () => {
  const { contact } = useContactSettings();
  return (
    <footer className="relative bg-white text-slate-700 overflow-hidden border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Footer Brand Header */}
        <div className="flex items-center gap-4 pb-8 mb-8 sm:mb-10 border-b border-slate-200/70">
          <img
            src={NavLogo}
            alt="Jamia Husainiya Logo"
            className="h-12 w-auto object-contain"
          />
          <div>
            <p className="text-base font-bold text-slate-900 leading-tight">
              জামিয়া হুসাইনিয়া মাদ্রাসা
            </p>
            <p className="text-xs text-emerald-700 mt-0.5 font-semibold">
              শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
            </p>
            <p className="text-xs text-slate-500 mt-1">
              সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
            </p>
          </div>
        </div>

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-slate-200/70">
          {/* Important Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              গুরুত্বপূর্ণ লিংকসমূহ
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                ["শিক্ষক বাতায়ন", "https://www.teachers.gov.bd/"],
                ["মাদ্রাসা শিক্ষা অধিদপ্তর", "https://dme.gov.bd/"],
                [
                  "বেফাকুল মাদারিসিল আরাবিয়া (রেজাল্ট)",
                  "https://wifaqresult.com/",
                ],
                ["বেফাকুল মাদারিসিল আরাবিয়া", "https://www.wifaqbd.org/"],
                ["কওমী মাদ্রাসা বোর্ড হবিগঞ্জ", "https://result.kowmimbh.com/"],
                ["আল হাইয়াতুল উলইয়া", "https://hems.alhaiatululya.org/"],
                ["মুআসসাসা ইলমিয়্যাহ বাংলাদেশ", "https://mibd.org/"],
                ["মাসিক আল কাউসার", "https://www.alkawsar.com/bn/"],
              ].map(([label, link], idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors duration-150"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mt-5 mb-2.5 pt-3 border-t border-slate-200/70">
              একাডেমিক ও রুটিন সেবা
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                ["ক্লাস রুটিন", "/class-routine"],
                ["পরীক্ষার রুটিন", "/exam-routine"],
                ["ছুটির তালিকা", "/holiday-calendar"],
                ["আবাসিক নীতিমালা", "/boarding-rules"],
                ["দৈনিক খাবার তালিকা", "/meal-menu"],
                ["সহ-পাঠ্যক্রম", "/co-curricular"],
              ].map(([label, path], idx) => (
                <li key={idx}>
                  <Link
                    to={path}
                    className="group flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors duration-150"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              স্ক্যান করুন
            </h3>
            <div className="inline-block p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
              ফেইসবুক পেজ ভিজিট করতে
              <br />
              QR কোড স্ক্যান করুন
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              যোগাযোগ
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`mailto:${contact.primary_email}`}
                  className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                    <FaEnvelope className="text-xs" />
                  </span>
                  <span className="truncate">{contact.primary_email}</span>
                </a>
              </li>
              {contact.secondary_email && (
                <li>
                  <a
                    href={`mailto:${contact.secondary_email}`}
                    className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                      <FaEnvelope className="text-xs" />
                    </span>
                    <span className="truncate">{contact.secondary_email}</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`tel:${contact.primary_phone}`}
                  className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                    <FaPhoneAlt className="text-xs" />
                  </span>
                  <span className="font-mono">{contact.primary_phone}</span>
                </a>
              </li>
              {contact.secondary_phone && (
                <li>
                  <a
                    href={`tel:${contact.secondary_phone}`}
                    className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                      <FaPhoneAlt className="text-xs" />
                    </span>
                    <span className="font-mono">{contact.secondary_phone}</span>
                  </a>
                </li>
              )}
              {contact.whatsapp_number && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp_number.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                      <FaWhatsapp className="text-xs" />
                    </span>
                    <span className="font-mono">{contact.whatsapp_number}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      হোয়াটসঅ্যাপ
                    </span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={
                    contact.google_maps_url ||
                    "https://www.google.com/maps/place/জামিয়া+হুসাইনিয়া"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 text-slate-600 hover:text-emerald-700 transition-colors group"
                >
                  <span className="mt-0.5 h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                    <FaMapMarkerAlt className="text-xs" />
                  </span>
                  <span>{contact.address}</span>
                </a>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-200/70 space-y-2">
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 text-xs text-slate-600 leading-relaxed shadow-xs">
                  <p className="text-slate-500 mb-1 font-medium">
                    পূবালী ব্যাংক একাউন্ট
                  </p>
                  <p className="font-mono font-bold text-slate-900 tracking-wide">
                    3070101040683
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5 font-mono">
                    BS25-C-0717526 TO BS25-C-0717550
                  </p>
                </div>
                {contact.bkash_number && (
                  <div className="rounded-xl bg-pink-50/70 border border-pink-200/70 px-3.5 py-2 text-xs text-slate-700 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-pink-700 block">
                        বিকাশ ({contact.bkash_type_display || "পার্সোনাল"})
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {contact.bkash_number}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full font-semibold">
                      ফি / অনুদান
                    </span>
                  </div>
                )}
                {contact.nagad_number && (
                  <div className="rounded-xl bg-orange-50/70 border border-orange-200/70 px-3.5 py-2 text-xs text-slate-700 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-orange-700 block">
                        নগদ ({contact.nagad_type_display || "পার্সোনাল"})
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {contact.nagad_number}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-semibold">
                      ফি / অনুদান
                    </span>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Social + Brand */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
              ফলো করুন
            </h3>
            <div className="flex gap-2.5 mb-5">
              {[
                {
                  href: "https://www.facebook.com/profile.php?id=61573036155447",
                  icon: FaFacebookF,
                  label: "Facebook",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-600 hover:text-emerald-700 transition-all duration-150 shadow-xs"
                >
                  <item.icon size={13} />
                </a>
              ))}
            </div>

            <div className="rounded-xl bg-emerald-50/70 border border-emerald-100/80 p-4">
              <p className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1.5 font-mono">
                আমাদের লক্ষ্য
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                কুরআন ও সুন্নাহভিত্তিক দ্বীনি শিক্ষার মাধ্যমে আদর্শ আলেম ও
                আল্লাহভীরু মানুষ তৈরী করা।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ,
            হবিগঞ্জ
          </p>
          <p className="text-xs text-slate-500">
            সুন্নতি ইলম, আমল ও আখলাকের সমন্বয়ে দ্বীনী শিক্ষা
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
