// src/features/teachers/components/Teacher.jsx
import { FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import avatarImage from "/avater.png";

const Teacher = ({ avatar, name, designation, phone_number }) => {
  return (
    <div
      className="group relative rounded-3xl p-6 bg-white/90 dark:bg-slate-900/90 
      border border-emerald-100/70 dark:border-emerald-600/40 
      shadow-md shadow-emerald-900/10 hover:shadow-emerald-600/40 
      hover:-translate-y-1 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="relative w-full flex justify-center">
        <div className="relative">
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-br 
            from-emerald-400 to-emerald-600 opacity-60 blur transition-all 
            group-hover:blur-lg group-hover:opacity-90"
          ></div>

          <img
            src={avatar || avatarImage}
            alt={name}
            className="relative w-32 h-32 rounded-full z-10 border-4 border-white 
            dark:border-slate-900 object-cover shadow-lg shadow-emerald-900/30"
            onError={(e) => (e.target.src = avatarImage)}
          />
        </div>
      </div>

      {/* Name */}
      <h3
        className="mt-5 text-xl font-bold text-slate-900 dark:text-white 
        text-center group-hover:text-emerald-600 dark:group-hover:text-emerald-300 
        transition-colors"
      >
        {name}
      </h3>

      {/* Designation */}
      <div className="mt-3 flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg">
          <FaChalkboardTeacher className="text-emerald-600 dark:text-emerald-300" />
        </div>
        <p className="text-sm">{designation}</p>
      </div>

      {/* Phone */}
      <div className="mt-1 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg">
          <FaPhone className="text-emerald-600 dark:text-emerald-300" />
        </div>
        <p className="text-sm">{phone_number || "প্রদান করা হয়নি"}</p>
      </div>
    </div>
  );
};

export default Teacher;
