import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUsers } from "react-icons/fi";
import Time from "../../../utils/formateData";

const AcademicDetail = ({
  className,
  classTitle,
  classSetCount,
  classStudentCount,
  classDescription,
  createdAt,
}) => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: "আসন সংখ্যা",
      value: classSetCount || "প্রযোজ্য নয়",
    },
    {
      icon: <FiUsers size={16} />,
      label: "ছাত্র সংখ্যা",
      value: classStudentCount || "প্রযোজ্য নয়",
    },
    {
      icon: <FiCalendar size={16} />,
      label: "তৈরির তারিখ",
      value: Time(createdAt),
    },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-900 text-white flex-shrink-0">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 font-display">{className}</h1>
          <p className="text-xs text-slate-500 font-sans">{classTitle}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Description */}
        <div className="rounded-lg border border-slate-200/70 bg-slate-50/50 p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            বিবরণ
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-bengali">
            {classDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-slate-50/50 p-4"
            >
              <span className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 text-emerald-600">
                {icon}
              </span>
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase font-medium">{label}</p>
                <p className="text-sm font-semibold text-slate-900 font-mono">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 transition-all duration-150"
        >
          <FiArrowLeft size={14} className="text-slate-600" />
          ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default AcademicDetail;