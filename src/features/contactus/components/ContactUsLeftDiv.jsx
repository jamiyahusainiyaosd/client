// src/features/contactus/components/ContactUsLeftDiv.jsx
import mapImage from "/map.png";

const ContactUsLeftDiv = () => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="relative rounded-3xl overflow-hidden shadow-xl 
        border border-emerald-100/70 dark:border-emerald-600/40 
        bg-white/50 dark:bg-slate-800/50 backdrop-blur flex justify-center">

        <img
          src={mapImage}
          alt="Madrasah Location"
          className="w-full h-full min-h-[450px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
          p-6 flex items-end">

          <a
            target="_blank"
            href="https://www.google.com/maps/place/..."
            className="text-white space-y-1"
          >
            <h3 className="text-2xl font-bold">আমাদের অবস্থান</h3>
            <p className="text-slate-200">শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট</p>
          </a>

        </div>
      </div>
    </div>
  );
};

export default ContactUsLeftDiv;
