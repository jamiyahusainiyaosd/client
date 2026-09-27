import { useState } from "react";
import PropTypes from "prop-types";
import { getTeacherStatusBadge } from "../utils/teacherUtils";

const TeacherCard = ({ teacher }) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopy = () => {
    if (teacher.phone_number) {
      navigator.clipboard?.writeText(teacher.phone_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const status = getTeacherStatusBadge(teacher.designation);
  const rawImage = teacher.avatar || teacher.image;
  const imageSrc = !imgError && rawImage ? rawImage : null;

  return (
    <article className="group site-card-alt hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Profile Header with Significantly Larger Image */}
        <div className="flex items-start gap-3.5 sm:gap-4 mb-3.5">
          {/* Large Teacher Portrait Avatar */}
          <div className="relative shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={teacher.name}
                onError={() => setImgError(true)}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white shadow-sm bg-white"
                loading="lazy"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[44px]">
                  person
                </span>
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-white flex items-center justify-center shadow-xs"
              title="সক্রিয় শিক্ষক"
            >
              <span className="material-symbols-outlined text-white text-[12px]">
                check
              </span>
            </span>
          </div>

          {/* Teacher Title & Role */}
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold shadow-xs mb-1.5 ${status.className}`}
            >
              {status.label}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {teacher.name}
            </h2>
            <p className="text-xs sm:text-sm text-body mt-1 font-medium line-clamp-2 leading-relaxed">
              {teacher.designation || "সম্মানিত শিক্ষক, জামিয়া হুসাইনিয়া"}
            </p>
          </div>
        </div>

        {/* Location & Institution Tag */}
        <div className="bg-white/70 rounded-xl p-2.5 border border-slate-200/60 flex items-center gap-1.5 text-xs text-muted mt-2">
          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
            location_on
          </span>
          <span className="truncate">
            {teacher.address || "শায়েস্তাগঞ্জ, হবিগঞ্জ"}
          </span>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
        <a
          href={teacher.phone_number ? `tel:${teacher.phone_number}` : "#"}
          className="inline-flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98"
        >
          <span className="material-symbols-outlined text-[17px]">call</span>
          <span className="font-medium tracking-wide">
            {teacher.phone_number || "+৮৮০ ১৭৫১৬৯৯৯০৯"}
          </span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs active:scale-95 relative shrink-0"
          title={copied ? "নম্বর কপি হয়েছে!" : "নম্বর কপি করুন"}
          aria-label="Copy phone number"
        >
          <span className="material-symbols-outlined text-[18px]">
            {copied ? "check" : "content_copy"}
          </span>
          {copied && (
            <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
              কপি হয়েছে
            </span>
          )}
        </button>
      </div>
    </article>
  );
};

TeacherCard.propTypes = {
  teacher: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    designation: PropTypes.string,
    phone_number: PropTypes.string,
    image: PropTypes.string,
    avatar: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default TeacherCard;
