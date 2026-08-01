import mapImage from "/map.png";

const ContactUsLeftDiv = () => {
  return (
    <div className="w-full lg:w-1/2 space-y-4">
      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200/80  bg-slate-100 ">
        <img
          src={mapImage}
          alt="Madrasah Location"
          className="w-full min-h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-5">
          <a
            href="https://www.google.com/maps/place/..."
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300 mb-1">
              আমাদের অবস্থান
            </p>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
            </h3>
          </a>
        </div>
      </div>

      {/* Contact info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            label: "ই-মেইল",
            value: "jamiyahusainiya1@gmail.com",
            href: "mailto:jamiyahusainiya1@gmail.com",
          },
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            ),
            label: "ফোন",
            value: "+8801751699909",
            href: "tel:+8801751699909",
          },
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            label: "ঠিকানা",
            value: "শায়েস্তাগঞ্জ, হবিগঞ্জ",
            href: "https://www.google.com/maps/place/...",
          },
        ].map(({ icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-slate-200/80  bg-white/70  p-3 hover:border-emerald-200  hover:bg-white  transition-all duration-200"
          >
            <span className="mt-0.5 h-7 w-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-emerald-50  text-emerald-600 ">
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400  mb-0.5">
                {label}
              </p>
              <p className="text-xs text-slate-700  break-all leading-snug group-hover:text-emerald-600  transition-colors">
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactUsLeftDiv;